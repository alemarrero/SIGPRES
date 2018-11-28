var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');
var recibirArchivo = require('../controllers/manejoDeArchivos/recibirArchivos');
var XLSX = require('xlsx');

router.post('/crear_producto', autorizarAdministrador, function(req, res, next) {
  console.log(req.body.subespecifica_id);
  console.log(req.body.especifica_id);
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


router.post('/actualizar_producto', autorizarAdministrador, function(req, res){
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

router.post('/eliminar_producto', autorizarAdministrador, function(req, res){
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


router.post('/habilitar_producto', autorizarAdministrador, function(req, res){
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

router.post('/deshabilitar_producto', autorizarAdministrador, function(req, res){
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

router.get('/obtener_productos', function(req, res){
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
  // let query = 
  // "SELECT * " 
  // + "FROM partidas_presupuestarias pp " 
  // + "JOIN genericas g on pp.id = g.partida_presupuestaria_id "
  // + "JOIN especificas e on e.generica_id = g.id "
  // + "JOIN subespecificas sub on sub.especifica_id = e.id " 
  // + "JOIN productos p on p.subespecifica_id = sub.id "
  // + "JOIN entradas_solicitud_de_requerimientos esr on esr.producto_id = p.id " 
  // + "JOIN solicitudes_de_requerimientos sol on sol.id = esr.solicitud_id "
  // + "WHERE sol.periodo = :periodo AND sol.enviada = true "
  // ;
  // models.sequelize.query(query, {replacements: { periodo: '2018'}, type: models.sequelize.QueryTypes.SELECT})
  // .then(resultado => {
  //   res.status(200).json(resultado)
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json("err");
  // });
  let consolidado = [];

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
                            where: {periodo: "2018", enviada: true},
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
                        where: {periodo: "2018", enviada: true},
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
                              var cantidad_primer_trimestre = 0;
                              var cantidad_segundo_trimestre = 0;
                              var cantidad_tercer_trimestre = 0;
                              var cantidad_cuarto_trimestre = 0;
                              var cantidad_total = 0;
                              let consolidado_producto = {};
                              if (producto.entradas_solicitud_de_requerimientos.length > 0) {
                                producto.entradas_solicitud_de_requerimientos.map(entrada => {  
                                  cantidad_primer_trimestre = cantidad_primer_trimestre + entrada.cantidad_primer_trimestre;
                                  cantidad_segundo_trimestre = cantidad_segundo_trimestre + entrada.cantidad_segundo_trimestre;
                                  cantidad_tercer_trimestre = cantidad_tercer_trimestre + entrada.cantidad_tercer_trimestre;
                                  cantidad_cuarto_trimestre = cantidad_cuarto_trimestre + entrada.cantidad_cuarto_trimestre;
                                  cantidad_total = cantidad_total + entrada.cantidad;
                                })
                                consolidado_producto['id'] = producto.id;
                                consolidado_producto['subespecifica'] = `${partida.numero_partida}.${generica.numero_generica}.${especifica.numero_especifica}.00`
                                consolidado_producto['producto'] = producto.nombre;
                                consolidado_producto['unidad_de_medida'] = producto.unidad_de_medida.nombre;
                                consolidado_producto['cantidad_primer_trimestre'] = cantidad_primer_trimestre;
                                consolidado_producto['cantidad_segundo_trimestre'] = cantidad_segundo_trimestre;
                                consolidado_producto['cantidad_tercer_trimestre'] = cantidad_tercer_trimestre;
                                consolidado_producto['cantidad_cuarto_trimestre'] = cantidad_cuarto_trimestre;
                                consolidado_producto['cantidad_total'] = cantidad_total;
                                console.log(consolidado_producto);
                                consolidado.push(consolidado_producto);
                              }  
                      })}
                        if (especifica.subespecificas.length > 0) {
                          especifica.subespecificas.map(subespecifica => { 2
                            if (subespecifica.productos.length > 0) {
                              subespecifica.productos.map(producto => {                             
                              var cantidad_primer_trimestre = 0;
                              var cantidad_segundo_trimestre = 0;
                              var cantidad_tercer_trimestre = 0;
                              var cantidad_cuarto_trimestre = 0;
                              var cantidad_total = 0;
                              let consolidado_producto = {};
                              if (producto.entradas_solicitud_de_requerimientos.length > 0) {
                                producto.entradas_solicitud_de_requerimientos.map(entrada => {  
                                  cantidad_primer_trimestre = cantidad_primer_trimestre + parseInt(entrada.cantidad_primer_trimestre,10);
                                  cantidad_segundo_trimestre = cantidad_segundo_trimestre + parseInt(entrada.cantidad_segundo_trimestre,10);
                                  cantidad_tercer_trimestre = cantidad_tercer_trimestre + parseInt(entrada.cantidad_tercer_trimestre,10);
                                  cantidad_cuarto_trimestre = cantidad_cuarto_trimestre + parseInt(entrada.cantidad_cuarto_trimestre,10);
                                  cantidad_total = cantidad_total + parseInt(entrada.cantidad,10);
                                })

                                consolidado_producto['id'] = producto.id;
                                consolidado_producto['subespecifica'] = `${partida.numero_partida}.${generica.numero_generica}.${especifica.numero_especifica}.${subespecifica.numero_subespecifica}`
                                consolidado_producto['producto'] = producto.nombre;
                                consolidado_producto['unidad_de_medida'] = producto.unidad_de_medida.nombre;
                                consolidado_producto['cantidad_primer_trimestre'] = cantidad_primer_trimestre;
                                consolidado_producto['cantidad_segundo_trimestre'] = cantidad_segundo_trimestre;
                                consolidado_producto['cantidad_tercer_trimestre'] = cantidad_tercer_trimestre;
                                consolidado_producto['cantidad_cuarto_trimestre'] = cantidad_cuarto_trimestre;
                                consolidado_producto['cantidad_total'] = cantidad_total;
                                console.log(consolidado_producto);
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
      // console.log(workbook.Sheets);
      const productos = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

      // // Se introducen las genéricas
      cargarProductos(productos, next);
    },

    function(req, res){
      res.status(200).json("ok");
    }
);

function cargarProductos(productos, next){
  Promise.all(productos.map(
    producto => {
      let especifica_id;
      let subespecifica_id;
      let unidad_de_medida_id;
      let iva = producto.porcentaje_iva < 1 ? producto.porcentaje_iva * 100 : producto.porcentaje_iva ;
  
      // Se busca el id de la unidad de medida asociada al producto. 
      // Si la unidad de medida no se encuentra en la base de datos
      // se crea una nueva unidad de medida
      models.unidades_de_medida.findOne({where: {nombre: producto.unidad_de_medida}})
      .then(unidad_de_medida => {
        if(unidad_de_medida){
          unidad_de_medida_id = unidad_de_medida.dataValues.id;
        }
        else{
          models.unidades_de_medida.create({nombre: producto.unidad_de_medida, tipo: "productos"})
          .then(unidad_de_medida => {
            unidad_de_medida_id = unidad_de_medida.dataValues.id;

            // Se verifica si el producto pertenece a una partida subespecífica (subespecifica !== 00)
            // o si pertenece a una partida específica (especifica === 00)
            if(producto.subespecifica === "00"){
              models.especificas.findOne({where: {numero_especifica: producto.especifica}})
              .then(especifica => {
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
                    {where: {id: prod.dataValues.codigo}})
                    .then(producto_actualizado => {
                      if(producto_actualizado[0]){
                        console.log(`Producto ${producto.nombre} actualizado correctamente`);
                      }
                    })
                    .catch(err => {
                      console.log(`Error al actualizar el producto ${producto_actualizado.dataValues.nombre}`);
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
                        console.log(`Producto ${producto.nombre} creado`);
                      }
                    })
                    .catch(err => {
                      console.log(`Error creando el producto ${producto.nombre}`);
                      console.log(err);
                    });
                  }
                })
                
              })
              .catch(err => {
                console.log('Error al procesar el producto ');
                console.log(producto.nombre);
              });
            }
            else{
              models.subespecificas.findOne({where: {numero_subespecifica: producto.subespecifica}})
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
                      nombre: `${producto.nombre}`,
                      precio: parseFloat(producto.precio, 10),
                      subespecifica_id: subespecifica_id,
                      unidad_de_medida_id: unidad_de_medida_id,
                      iva: parseFloat(iva, 10),
                      monto_iva: parseFloat(producto.monto_iva, 10),
                      total: parseFloat(producto.precio_total, 10)
                    }, 
                    {where: {id: prod.dataValues.codigo}})
                    .then(producto_actualizado => {
                      console.log(producto_actualizado);
                      if(producto_actualizado[0]){
                        // console.log(`Producto ${producto.nombre} actualizado correctamente`);
                      }
                    })
                    .catch(err => {
                      console.log(`Error al actualizar el producto ${producto_actualizado.dataValues.nombre}`);
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
                        console.log(`Producto ${producto.nombre} creado`);
                      }
                    })
                    .catch(err => {
                      console.log(`Error creando el producto ${producto.nombre}`);
                      // console.log(err);
                    });
                  }
                })
      
              })
              .catch(err => {
                console.error(err);
                // res.status(500).json("err")
              });
            }
          })
          .catch(err => {
            console.err(err);
          });
        }
      })
      .catch(err => {
        console.log('Error al procesar el producto (linea 474)');
        console.log(producto);
      });
    }
  ))
  .then(() => {
    next();
  });
}

module.exports = router;
