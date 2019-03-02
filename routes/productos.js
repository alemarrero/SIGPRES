var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var autorizarDirectorPP = require('../controllers/autenticacion/autorizarDirectorPP');
var models = require('../models');
var recibirArchivo = require('../controllers/manejoDeArchivos/recibirArchivos');
var XLSX = require('xlsx');

var mcache = require('memory-cache');

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
};

router.post('/crear_producto', autorizarDirectorPP, function(req, res, next) {
  if (req.body.subespecifica_id !== undefined){
    var precio = parseFloat(req.body.precio,10);
    var iva = parseFloat(req.body.iva,10);
    var monto_iva = (iva/100) * precio;
    var total = precio + monto_iva;
    models.productos.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        precio: precio,
        subespecifica_id: req.body.subespecifica_id,
        unidad_de_medida_id: req.body.unidad_de_medida_id,
        iva: iva,
        monto_iva: monto_iva,
        total: total
    })
    .then(response => {
        if(response){
          res.json('ok').status(200);
        }
      })
      .catch(err => {
        console.log(err);
        res.json('err').status(500);
      });    
}
  else{
    var precio = parseFloat(req.body.precio,10);
    var iva = parseFloat(req.body.iva,10);
    var monto_iva = (iva/100) * precio;
    var total = precio + monto_iva;    
    models.productos.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        precio: precio,
        especifica_id: req.body.especifica_id,
        unidad_de_medida_id: req.body.unidad_de_medida_id,
        iva: iva,
        monto_iva: monto_iva,
        total: total         
    })
    .then(response => {
        if(response){
          res.json('ok').status(200);
        }
      })
      .catch(err => {
        console.log(err);
        res.json('err').status(500);
      });
    }  
});


router.post('/actualizar_producto', autorizarDirectorPP, function(req, res){
  var precio = parseFloat(req.body.precio,10);
  var iva = parseFloat(req.body.iva,10);
  var monto_iva = (iva/100) * precio;
  var total = precio + monto_iva;
  models.productos.update({
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    precio: precio,
    unidad_de_medida_id: req.body.unidad_de_medida_id,
    especifica_id: req.body.especifica_id,
    subespecifica_id: req.body.subespecifica_id,
    habilitado: req.body.habilitado,
    iva: iva,
    monto_iva: monto_iva,
    total: total
  },
  {where: {id: req.body.id}})
  .then(resultado => {
    if(resultado[0]){
      res.status(200).json('ok');
    }
    else{
      res.status(404).json('err');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  });
});

router.post('/eliminar_producto', autorizarDirectorPP, function(req, res){
  models.productos.destroy({where: {id: req.body.id}})
  .then(resultado => {
    if(resultado){
      res.status(200).json('ok');
    }
    else{
      res.status(404).json('err');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  });
});


router.post('/habilitar_producto', autorizarDirectorPP, function(req, res){
  models.productos.update({
    habilitado: true 
  }, {where: {id: req.body.id}})
  .then(x => {
    if(x[0]){
      res.json('ok').status(200);
    }
    else{
      res.json('err').status(404);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/deshabilitar_producto', autorizarDirectorPP, function(req, res){
  models.productos.update({
    habilitado: false 
  }, {where: {id: req.body.id}})
  .then(x => {
    if(x[0]){
      res.json('ok').status(200);
    }
    else{
      res.json('err').status(404);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_productos', cache(604800000), function(req, res){
  models.productos.findAll({
      include:[
          {
          model: models.unidades_de_medida,
          as: 'unidad_de_medida',
          attributes: ["nombre"]
          },
          {
            model: models.subespecificas,
            as: 'subespecifica',
            include: [
              {
                model: models.especificas,
                as: 'especifica',
                include: [
                  {
                    model: models.genericas,
                    as: 'generica',
                    include: [
                      {
                        model: models.partidas_presupuestarias,
                        as: 'partida_presupuestaria'
                      }
                    ]
                  }
                ]
              }
            ]            
          },
          {
            model: models.especificas,
            as: 'especifica',
            include: [
              {
                model: models.genericas,
                as: 'generica',
                include: [
                  {
                    model: models.partidas_presupuestarias,
                    as: 'partida_presupuestaria'
                  }
                ]
              }
            ]
          }
      ]
  })
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_consolidado_presupuesto', function(req, res){
  let consolidado = [];
  const fecha = new Date();
  const año = parseInt(fecha.toDateString().split(" ")[3], 10) + 1;

  models.partidas_presupuestarias.findAll({
    attributes: ["denominacion", "numero_partida", "id"],
    separate: true,
    include: [
      {
        model: models.genericas,
        as: "genericas",
        attributes: ["numero_generica", "denominacion", "id"],
        include: [
          {
            model: models.especificas,
            as: "especificas",
            attributes: ["numero_especifica", "denominacion", "id"],
            include: [
              {
                model: models.subespecificas,
                as: "subespecificas",
                attributes: ["numero_subespecifica", "denominacion", "id"],
                include: [
                  {
                    model: models.productos,
                    as: "productos",
                    separate: true,
                    include: [
                      {
                        model: models.entradas_solicitud_de_requerimientos,
                        as: "entradas_solicitud_de_requerimientos",
                        include: [
                          {
                            model: models.solicitudes_de_requerimientos,
                            as: "solicitud_de_requerimiento",
                            attributes: ["periodo", "area_id"],
                            where: {periodo: `${año}`, enviada: true},
                            required: false,
                          }                   
                        ]
                      },                      
                      {
                        model: models.unidades_de_medida,
                        as: "unidad_de_medida",
                        attributes: ["nombre"]                    
                      },                      

                    ]
                  }
                ]
              },
              {
                model: models.productos,
                as: "productos",
                separate: true,
                include: [
                  {
                    model: models.entradas_solicitud_de_requerimientos,
                    as: "entradas_solicitud_de_requerimientos",
                    include: [
                      {
                        model: models.solicitudes_de_requerimientos,
                        as: "solicitud_de_requerimiento",
                        attributes: ["periodo", "area_id"],
                        required: false,
                        where: {periodo: `${año}`, enviada: true},
                      }
                    ]
                  },
                  {
                    model: models.unidades_de_medida,
                    as: "unidad_de_medida",
                    attributes: ["nombre"]                    
                  },

                ]
              }
            ]
          }
        ]
      }
    ]
  })
  .then(resultado => {
    if(resultado.length > 0){
      resultado.map(partida => {
          if(partida.genericas.length > 0){
              partida.genericas.map(generica => {
                  if(generica.especificas.length > 0){
                      generica.especificas.map(especifica => { 
                        if (especifica.productos.length > 0) {
                            especifica.productos.map(producto => { 
                              var cantidad_enero = 0;
                              var cantidad_febrero = 0;
                              var cantidad_marzo = 0;
                              var cantidad_abril = 0;
                              var cantidad_mayo = 0;
                              var cantidad_junio = 0;
                              var cantidad_julio = 0;
                              var cantidad_agosto = 0;
                              var cantidad_septiembre = 0;
                              var cantidad_octubre = 0;
                              var cantidad_noviembre = 0;
                              var cantidad_diciembre = 0;                                                            
                              var cantidad_total = 0;
                              let consolidado_producto = {};
                              if (producto.entradas_solicitud_de_requerimientos.length > 0) {
                                producto.entradas_solicitud_de_requerimientos.map(entrada => {  
                                  cantidad_enero = cantidad_enero + entrada.cantidad_enero;
                                  cantidad_febrero = cantidad_febrero + entrada.cantidad_febrero;
                                  cantidad_marzo = cantidad_marzo + entrada.cantidad_marzo;
                                  cantidad_abril = cantidad_abril + entrada.cantidad_abril;
                                  cantidad_mayo = cantidad_mayo + entrada.cantidad_mayo;
                                  cantidad_junio = cantidad_junio + entrada.cantidad_junio;
                                  cantidad_julio = cantidad_julio + entrada.cantidad_julio;
                                  cantidad_agosto = cantidad_agosto + entrada.cantidad_agosto;
                                  cantidad_septiembre = cantidad_septiembre + entrada.cantidad_septiembre;
                                  cantidad_octubre = cantidad_octubre + entrada.cantidad_octubre;
                                  cantidad_noviembre = cantidad_noviembre + entrada.cantidad_noviembre;
                                  cantidad_diciembre = cantidad_diciembre + entrada.cantidad_diciembre;                                  
                                  cantidad_total = cantidad_total + entrada.cantidad;
                                })
                                consolidado_producto['id'] = producto.id;
                                consolidado_producto['subespecifica'] = `${partida.numero_partida}.${generica.numero_generica}.${especifica.numero_especifica}.00`
                                consolidado_producto['producto'] = producto.nombre;
                                consolidado_producto['codigo_producto'] = producto.codigo;
                                consolidado_producto['precio_producto'] = producto.precio;
                                consolidado_producto['iva_producto'] = producto.monto_iva;
                                consolidado_producto['precio_total_producto'] = producto.total;
                                consolidado_producto['monto_total_producto'] = cantidad_total * producto.total;                                
                                consolidado_producto['unidad_de_medida'] = producto.unidad_de_medida.nombre;
                                consolidado_producto['cantidad_enero'] = cantidad_enero;
                                consolidado_producto['cantidad_febrero'] = cantidad_febrero;
                                consolidado_producto['cantidad_marzo'] = cantidad_marzo;
                                consolidado_producto['cantidad_abril'] = cantidad_abril;
                                consolidado_producto['cantidad_mayo'] = cantidad_mayo;
                                consolidado_producto['cantidad_junio'] = cantidad_junio;
                                consolidado_producto['cantidad_julio'] = cantidad_julio;
                                consolidado_producto['cantidad_agosto'] = cantidad_agosto;
                                consolidado_producto['cantidad_septiembre'] = cantidad_septiembre;
                                consolidado_producto['cantidad_octubre'] = cantidad_octubre;
                                consolidado_producto['cantidad_noviembre'] = cantidad_noviembre;
                                consolidado_producto['cantidad_diciembre'] = cantidad_diciembre;                                                                
                                consolidado_producto['cantidad_total'] = cantidad_total;
                                consolidado.push(consolidado_producto);
                              }  
                      })}
                        if (especifica.subespecificas.length > 0) {
                          especifica.subespecificas.map(subespecifica => { 2
                            if (subespecifica.productos.length > 0) {
                              subespecifica.productos.map(producto => {                             
                              var cantidad_enero = 0;
                              var cantidad_febrero = 0;
                              var cantidad_marzo = 0;
                              var cantidad_abril = 0;
                              var cantidad_mayo = 0;
                              var cantidad_junio = 0;
                              var cantidad_julio = 0;
                              var cantidad_agosto = 0;
                              var cantidad_septiembre = 0;
                              var cantidad_octubre = 0;
                              var cantidad_noviembre = 0;
                              var cantidad_diciembre = 0;    
                              var cantidad_total = 0;
                              let consolidado_producto = {};
                              if (producto.entradas_solicitud_de_requerimientos.length > 0) {
                                producto.entradas_solicitud_de_requerimientos.map(entrada => {  
                                  cantidad_enero = cantidad_enero + entrada.cantidad_enero;
                                  cantidad_febrero = cantidad_febrero + entrada.cantidad_febrero;
                                  cantidad_marzo = cantidad_marzo + entrada.cantidad_marzo;
                                  cantidad_abril = cantidad_abril + entrada.cantidad_abril;
                                  cantidad_mayo = cantidad_mayo + entrada.cantidad_mayo;
                                  cantidad_junio = cantidad_junio + entrada.cantidad_junio;
                                  cantidad_julio = cantidad_julio + entrada.cantidad_julio;
                                  cantidad_agosto = cantidad_agosto + entrada.cantidad_agosto;
                                  cantidad_septiembre = cantidad_septiembre + entrada.cantidad_septiembre;
                                  cantidad_octubre = cantidad_octubre + entrada.cantidad_octubre;
                                  cantidad_noviembre = cantidad_noviembre + entrada.cantidad_noviembre;
                                  cantidad_diciembre = cantidad_diciembre + entrada.cantidad_diciembre;   
                                  cantidad_total = cantidad_total + parseInt(entrada.cantidad,10);
                                })

                                consolidado_producto['id'] = producto.id;
                                consolidado_producto['subespecifica'] = `${partida.numero_partida}.${generica.numero_generica}.${especifica.numero_especifica}.${subespecifica.numero_subespecifica}`
                                consolidado_producto['producto'] = producto.nombre;
                                consolidado_producto['codigo_producto'] = producto.codigo;
                                consolidado_producto['precio_producto'] = producto.precio;
                                consolidado_producto['iva_producto'] = producto.monto_iva;
                                consolidado_producto['precio_total_producto'] = producto.total;
                                consolidado_producto['monto_total_producto'] = cantidad_total * producto.total;
                                consolidado_producto['unidad_de_medida'] = producto.unidad_de_medida.nombre;
                                consolidado_producto['cantidad_enero'] = cantidad_enero;
                                consolidado_producto['cantidad_febrero'] = cantidad_febrero;
                                consolidado_producto['cantidad_marzo'] = cantidad_marzo;
                                consolidado_producto['cantidad_abril'] = cantidad_abril;
                                consolidado_producto['cantidad_mayo'] = cantidad_mayo;
                                consolidado_producto['cantidad_junio'] = cantidad_junio;
                                consolidado_producto['cantidad_julio'] = cantidad_julio;
                                consolidado_producto['cantidad_agosto'] = cantidad_agosto;
                                consolidado_producto['cantidad_septiembre'] = cantidad_septiembre;
                                consolidado_producto['cantidad_octubre'] = cantidad_octubre;
                                consolidado_producto['cantidad_noviembre'] = cantidad_noviembre;
                                consolidado_producto['cantidad_diciembre'] = cantidad_diciembre;  
                                consolidado_producto['cantidad_total'] = cantidad_total;
                                consolidado.push(consolidado_producto);
                              }                            
                          })}})}                        

              })
        }})
      }})
    }    
    res.status(200).json(consolidado);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/cargar_productos', 
    recibirArchivo, 
    
    function(req, res, next){
      // Contiene el archivo XLS subido por el usuario
      const workbook = XLSX.readFile(req.file.path);
      const productos = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

      // // Se introducen las genéricas
      cargarProductos(productos, next);
    },

    function(req, res){
      //res.status(200).json("ok");
    }
);

function cargarProductos(productos, next){
  Promise.all(productos.map(
    producto => {
      let componentes_partida_presupuestaria = producto.partida.split(".");
      let numero_partida_presupuestaria = `${componentes_partida_presupuestaria[0]}${componentes_partida_presupuestaria[1]}`;
      let especifica_id;
      let subespecifica_id;
      let unidad_de_medida_id;
      let iva = producto.porcentaje_iva < 1 ? producto.porcentaje_iva * 100 : producto.porcentaje_iva ;
  
      // Se busca el id de la unidad de medida asociada al producto. 
      // Si la unidad de medida no se encuentra en la base de datos
      // se crea una nueva unidad de medida
      models.partidas_presupuestarias.findOne({where: {numero_partida: numero_partida_presupuestaria}})
      .then(partida_presupuestaria => {
        models.genericas.findOne({where: {numero_generica: `${producto.generica}`, partida_presupuestaria_id: partida_presupuestaria.dataValues.id}})
        .then(generica => {
          models.especificas.findOne({where: {numero_especifica: `${producto.especifica}`, generica_id: generica.dataValues.id}})
            .then(especifica => {
              models.unidades_de_medida.findOne({where: {nombre: producto.unidad_de_medida}})
                .then(unidad_de_medida => {
                  if(unidad_de_medida){
                    unidad_de_medida_id = unidad_de_medida.dataValues.id;

                    // Se verifica si el producto pertenece a una partida subespecífica (subespecifica !== 00)
                    // o si pertenece a una partida específica (especifica === 00)
                    if(producto.subespecifica === "00"){
                      especifica_id = especifica.dataValues.id;
                        
                      // Se verifica si el producto ya se encuentra en la base de datos;
                      // en caso de encontrarse, se actualiza su información,
                      // de lo contrario, se crea un producto nuevo
                      models.productos.findOne({where: {codigo: producto.codigo}})
                        .then(prod => {
                          if(prod){
                            models.productos.update({
                              nombre: `${producto.nombre}`,
                              precio: parseFloat(producto.precio, 10),
                              especifica_id: especifica_id,
                              unidad_de_medida_id: unidad_de_medida_id,
                              iva: parseFloat(iva, 10),
                              monto_iva: parseFloat(producto.monto_iva, 10),
                              total: parseFloat(producto.precio_total, 10)
                            }, 
                            {where: {id: prod.dataValues.id}})
                            .then(producto_actualizado => {
                              if(producto_actualizado[0]){
                              }
                            })
                            .catch(err => {
                              console.log(`Error al actualizar el producto ${producto_actualizado.dataValues.nombre} - linea 515`);
                              console.log(err);
                            });
                          }
                          else{
                            models.productos.create({
                              codigo: producto.codigo,
                              nombre: `${producto.nombre}`,
                              precio: parseFloat(producto.precio, 10),
                              especifica_id: especifica_id,
                              unidad_de_medida_id: unidad_de_medida_id,
                              iva: parseFloat(iva, 10),
                              monto_iva: parseFloat(producto.monto_iva, 10),
                              total: parseFloat(producto.precio_total, 10)
                            })
                            .then(producto_creado => {
                              if(producto_creado){
                              }
                            })
                            .catch(err => {
                              console.log(`Error creando el producto ${producto.nombre} - linea 536`);
                              console.log(err);
                            });
                          }
                        });
                    }
                    else{
                       models.subespecificas.findOne({where: {numero_subespecifica: producto.subespecifica, especifica_id: especifica.dataValues.id}})
                        .then(subespecifica => {
                          subespecifica_id = subespecifica.dataValues.id;
                
                          // Se verifica si el producto ya se encuentra en la base de datos;
                          // en caso de encontrarse, se actualiza su información,
                          // de lo contrario, se crea un producto nuevo
                          models.productos.findOne({where: {codigo: producto.codigo}})
                          .then(prod => {
                            if(prod){
                              models.productos.update({
                                nombre: `${producto.nombre}`,
                                precio: parseFloat(producto.precio, 10),
                                subespecifica_id: subespecifica_id,
                                unidad_de_medida_id: unidad_de_medida_id,
                                iva: parseFloat(iva, 10),
                                monto_iva: parseFloat(producto.monto_iva, 10),
                                total: parseFloat(producto.precio_total, 10)
                              }, 
                              {where: {id: prod.dataValues.id}})
                              .then(producto_actualizado => {
                                if(producto_actualizado[0]){
                                }
                              })
                              .catch(err => {
                                console.log(`Error al actualizar el producto ${producto_actualizado.dataValues.nombre} - linea 570`);
                                console.log(err);
                              });
                            }
                            else{
                              models.productos.create({
                                codigo: producto.codigo,
                                nombre: `${producto.nombre}`,
                                precio: parseFloat(producto.precio, 10),
                                subespecifica_id: subespecifica_id,
                                unidad_de_medida_id: unidad_de_medida_id,
                                iva: parseFloat(iva, 10),
                                monto_iva: parseFloat(producto.monto_iva, 10),
                                total: parseFloat(producto.precio_total, 10)
                              })
                              .then(producto_creado => {
                                if(producto_creado){
                                }
                              })
                              .catch(err => {
                                console.log(`Error creando el producto ${producto.nombre} - linea 591`);
                              });
                            }
                          })
                
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                  }
                  else{
                    models.unidades_de_medida.create({nombre: producto.unidad_de_medida, tipo: "productos"})
                    .then(unidad_de_medida => {
                      unidad_de_medida_id = unidad_de_medida.dataValues.id;

                      // Se verifica si el producto pertenece a una partida subespecífica (subespecifica !== 00)
                    // o si pertenece a una partida específica (especifica === 00)
                    if(producto.subespecifica === "00"){
                      especifica_id = especifica.dataValues.id;
                        
                      // Se verifica si el producto ya se encuentra en la base de datos;
                      // en caso de encontrarse, se actualiza su información,
                      // de lo contrario, se crea un producto nuevo
                      models.productos.findOne({where: {codigo: producto.codigo}})
                        .then(prod => {
                          if(prod){
                            models.productos.update({
                              nombre: `${producto.nombre}`,
                              precio: parseFloat(producto.precio, 10),
                              especifica_id: especifica_id,
                              unidad_de_medida_id: unidad_de_medida_id,
                              iva: parseFloat(iva, 10),
                              monto_iva: parseFloat(producto.monto_iva, 10),
                              total: parseFloat(producto.precio_total, 10)
                            }, 
                            {where: {id: prod.dataValues.id}})
                            .then(producto_actualizado => {
                              if(producto_actualizado[0]){
                                console.log(`Producto ${producto.nombre} actualizado correctamente - linea 632`);
                              }
                            })
                            .catch(err => {
                              console.log(`Error al actualizar el producto ${producto_actualizado.dataValues.nombre} - linea 636`);
                            });
                          }
                          else{
                            models.productos.create({
                              codigo: producto.codigo,
                              nombre: `${producto.nombre}`,
                              precio: parseFloat(producto.precio, 10),
                              especifica_id: especifica_id,
                              unidad_de_medida_id: unidad_de_medida_id,
                              iva: parseFloat(iva, 10),
                              monto_iva: parseFloat(producto.monto_iva, 10),
                              total: parseFloat(producto.precio_total, 10)
                            })
                            .then(producto_creado => {
                              if(producto_creado){
                                console.log(`Producto ${producto.nombre} creado - linea 653`);
                              }
                            })
                            .catch(err => {
                              console.log(`Error creando el producto ${producto.nombre} - linea 657`);
                              console.log(err);
                            });
                          }
                        });
                    }
                    else{
                      models.subespecificas.findOne({where: {numero_subespecifica: producto.subespecifica, especifica_id: especifica.dataValues.id}})
                      .then(subespecifica => {
                        subespecifica_id = subespecifica.dataValues.id;
              
                        // Se verifica si el producto ya se encuentra en la base de datos;
                        // en caso de encontrarse, se actualiza su información,
                        // de lo contrario, se crea un producto nuevo
                        models.productos.findOne({where: {codigo: producto.codigo}})
                        .then(prod => {
                          if(prod){
                            models.productos.update({
                              nombre: `${producto.nombre}`,
                              precio: parseFloat(producto.precio, 10),
                              subespecifica_id: subespecifica_id,
                              unidad_de_medida_id: unidad_de_medida_id,
                              iva: parseFloat(iva, 10),
                              monto_iva: parseFloat(producto.monto_iva, 10),
                              total: parseFloat(producto.precio_total, 10)
                            }, 
                            {where: {id: prod.dataValues.id}})
                            .then(producto_actualizado => {
                              if(producto_actualizado[0]){
                              }
                            })
                            .catch(err => {
                              console.log(`Error al actualizar el producto ${producto_actualizado.dataValues.nombre} - linea 691`);
                            });
                          }
                          else{
                            models.productos.create({
                              codigo: producto.codigo,
                              nombre: `${producto.nombre}`,
                              precio: parseFloat(producto.precio, 10),
                              subespecifica_id: subespecifica_id,
                              unidad_de_medida_id: unidad_de_medida_id,
                              iva: parseFloat(iva, 10),
                              monto_iva: parseFloat(producto.monto_iva, 10),
                              total: parseFloat(producto.precio_total, 10)
                            })
                            .then(producto_creado => {
                              if(producto_creado){
                                //console.log(`Producto ${producto.nombre} creado`);
                              }
                            })
                            .catch(err => {
                              console.log(`Error creando el producto ${producto.nombre} - linea 712`);
                              // console.log(err);
                            });
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          // res.status(500).json("err")
                        });
                      })
                      .catch(err => {
                        console.log(err);
                        // res.status(500).json("err")
                      });
                    }
                    })
                    .catch(err => {
                      console.log('Error al procesar el producto (linea 729)');
                      console.log(err);
                    });
                  }
                })
                .catch(err => {
                  console.log('Error al procesar el producto (linea 735)');
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
          //res.status(500).json("err");
        })
      })
      .catch(err => {
        console.log(err);
        //res.status(500).json("err");
      })
    }
  ))
  .then(() => {
    next();
  });
}

module.exports = router;
