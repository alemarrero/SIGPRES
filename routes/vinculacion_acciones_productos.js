
var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var models = require('../models');

router.post('/crear_vinculacion_accion_producto', autorizarAdministrador, function(req, res, next) {
  var cantidad_enero = parseInt(req.body.cantidad_enero, 10);
  var cantidad_febrero = parseInt(req.body.cantidad_febrero, 10);
  var cantidad_marzo = parseInt(req.body.cantidad_marzo, 10);
  var cantidad_abril = parseInt(req.body.cantidad_abril, 10);
  var cantidad_mayo = parseInt(req.body.cantidad_mayo, 10);
  var cantidad_junio = parseInt(req.body.cantidad_junio, 10);
  var cantidad_julio = parseInt(req.body.cantidad_julio, 10);
  var cantidad_agosto = parseInt(req.body.cantidad_agosto, 10);
  var cantidad_septiembre = parseInt(req.body.cantidad_septiembre, 10);
  var cantidad_octubre = parseInt(req.body.cantidad_octubre, 10);
  var cantidad_noviembre = parseInt(req.body.cantidad_noviembre, 10);
  var cantidad_diciembre = parseInt(req.body.cantidad_diciembre, 10);            
  var cantidad = cantidad_enero + cantidad_febrero + cantidad_marzo + cantidad_abril + cantidad_mayo + cantidad_junio + cantidad_julio + cantidad_agosto + cantidad_septiembre + cantidad_octubre + cantidad_noviembre + cantidad_diciembre;          
  models.vinculacion_acciones_productos.create({
    cantidad_enero: cantidad_enero,
    cantidad_febrero: cantidad_febrero,
    cantidad_marzo: cantidad_marzo,
    cantidad_abril: cantidad_abril,
    cantidad_mayo: cantidad_mayo,
    cantidad_junio: cantidad_junio,
    cantidad_julio: cantidad_julio,
    cantidad_agosto: cantidad_agosto,
    cantidad_septiembre: cantidad_septiembre,
    cantidad_octubre: cantidad_octubre,
    cantidad_noviembre: cantidad_noviembre,
    cantidad_diciembre: cantidad_diciembre,
    cantidad: cantidad,    
    accion_id: req.body.accion_id,
    producto_id: req.body.producto_id 
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
});


router.post('/actualizar_vinculacion_accion_producto', autorizarAdministrador, function(req, res){
  var cantidad_enero = parseInt(req.body.cantidad_enero, 10);
  var cantidad_febrero = parseInt(req.body.cantidad_febrero, 10);
  var cantidad_marzo = parseInt(req.body.cantidad_marzo, 10);
  var cantidad_abril = parseInt(req.body.cantidad_abril, 10);
  var cantidad_mayo = parseInt(req.body.cantidad_mayo, 10);
  var cantidad_junio = parseInt(req.body.cantidad_junio, 10);
  var cantidad_julio = parseInt(req.body.cantidad_julio, 10);
  var cantidad_agosto = parseInt(req.body.cantidad_agosto, 10);
  var cantidad_septiembre = parseInt(req.body.cantidad_septiembre, 10);
  var cantidad_octubre = parseInt(req.body.cantidad_octubre, 10);
  var cantidad_noviembre = parseInt(req.body.cantidad_noviembre, 10);
  var cantidad_diciembre = parseInt(req.body.cantidad_diciembre, 10);            
  var cantidad = cantidad_enero + cantidad_febrero + cantidad_marzo + cantidad_abril + cantidad_mayo + cantidad_junio + cantidad_julio + cantidad_agosto + cantidad_septiembre + cantidad_octubre + cantidad_noviembre + cantidad_diciembre;           
  models.vinculacion_acciones_productos.update({
    cantidad_enero: cantidad_enero,
    cantidad_febrero: cantidad_febrero,
    cantidad_marzo: cantidad_marzo,
    cantidad_abril: cantidad_abril,
    cantidad_mayo: cantidad_mayo,
    cantidad_junio: cantidad_junio,
    cantidad_julio: cantidad_julio,
    cantidad_agosto: cantidad_agosto,
    cantidad_septiembre: cantidad_septiembre,
    cantidad_octubre: cantidad_octubre,
    cantidad_noviembre: cantidad_noviembre,
    cantidad_diciembre: cantidad_diciembre,
    cantidad: cantidad,    
    accion_id: req.body.accion_id,
    producto_id: req.body.producto_id  
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

router.post('/eliminar_vinculacion_accion_producto', autorizarAdministrador, function(req, res){
  models.vinculacion_acciones_productos.destroy({where: {id: req.body.id}})
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

router.get('/obtener_vinculacion_acciones_productos', function(req, res){
  let vinculacion = [];
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
                      {
                        model: models.vinculacion_acciones_productos,
                        as: "vinculacion_acciones_productos",
                        separate: true,
                        include:[
                          {
                          model: models.acciones_recurrentes,
                          as: "acciones_recurrentes",
                          attributes:["accion_recurrente"],
                          include:[
                            {
                              model: models.objetivos_especificos,
                              as: "objetivo_especifico",
                              attributes:["propuesta_id"],
                              include: [
                                {
                                  model: models.propuestas_plan_operativo_anual,
                                  as: "propuesta",
                                  where: {periodo: `${año}`},
                                  attributes: ["area_id", "periodo"],
                                }
                              ]
                            }
                          ]
                        }
                        ]
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
                  {
                    model: models.vinculacion_acciones_productos,
                    as: "vinculacion_acciones_productos",
                    separate: true,
                    include:[
                      {
                      model: models.acciones_recurrentes,
                      as: "acciones_recurrentes",
                      include:[
                        {
                          model: models.objetivos_especificos,
                          as: "objetivo_especifico",
                          attributes:["propuesta_id"],
                          include: [
                            {
                              model: models.propuestas_plan_operativo_anual,
                              as: "propuesta",
                              where: {periodo: `${año}`},
                              attributes: ["area_id", "periodo"]
                            }
                          ]
                        }
                      ]                      
                      }
                    ]
                  }

                ]
              }
            ]
          }
        ]
      }
    ]
  })
  .then( resultado => {
    if(resultado.length > 0){
      resultado.map(partida => {
          if(partida.genericas.length > 0){
              partida.genericas.map(generica => {
                  if(generica.especificas.length > 0){
                      generica.especificas.map(especifica => { 
                        if (especifica.productos.length > 0) {
                            especifica.productos.map(producto => {                                                          
                              var cantidad_total = 0;
                              let consolidado_producto = {};
                              if(producto.vinculacion_acciones_productos.length > 0) {
                                if (producto.entradas_solicitud_de_requerimientos.length > 0) {
                                    producto.vinculacion_acciones_productos.map(vinculacion_accion_producto => {
                                      if (vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta !== null){
                                        consolidado_producto['accion_id'] = vinculacion_accion_producto.accion_id;
                                        consolidado_producto['area_id'] = vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta.area_id;
                                        consolidado_producto['nombre_accion'] = vinculacion_accion_producto.acciones_recurrentes.accion_recurrente;
                                        consolidado_producto['id'] = vinculacion_accion_producto.id;
                                        consolidado_producto['producto_id'] = vinculacion_accion_producto.producto_id;
                                        consolidado_producto['subespecifica'] = `${partida.numero_partida}.${generica.numero_generica}.${especifica.numero_especifica}.00`
                                        consolidado_producto['denominacion'] = especifica.denominacion;
                                        consolidado_producto['producto'] = producto.nombre;
                                        consolidado_producto['codigo_producto'] = producto.codigo;
                                        consolidado_producto['precio_producto'] = producto.precio;
                                        consolidado_producto['iva_producto'] = producto.monto_iva;
                                        consolidado_producto['precio_total_producto'] = producto.total;
                                        consolidado_producto['monto_total_producto'] = vinculacion_accion_producto.cantidad * producto.total;                                
                                        consolidado_producto['unidad_de_medida'] = producto.unidad_de_medida.nombre;
                                        consolidado_producto['cantidad_enero'] = vinculacion_accion_producto.cantidad_enero;
                                        consolidado_producto['cantidad_febrero'] = vinculacion_accion_producto.cantidad_febrero;
                                        consolidado_producto['cantidad_marzo'] = vinculacion_accion_producto.cantidad_marzo;
                                        consolidado_producto['cantidad_abril'] = vinculacion_accion_producto.cantidad_abril;
                                        consolidado_producto['cantidad_mayo'] = vinculacion_accion_producto.cantidad_mayo;
                                        consolidado_producto['cantidad_junio'] = vinculacion_accion_producto.cantidad_junio;
                                        consolidado_producto['cantidad_julio'] = vinculacion_accion_producto.cantidad_julio;
                                        consolidado_producto['cantidad_agosto'] = vinculacion_accion_producto.cantidad_agosto;
                                        consolidado_producto['cantidad_septiembre'] = vinculacion_accion_producto.cantidad_septiembre;
                                        consolidado_producto['cantidad_octubre'] = vinculacion_accion_producto.cantidad_octubre;
                                        consolidado_producto['cantidad_noviembre'] = vinculacion_accion_producto.cantidad_noviembre;
                                        consolidado_producto['cantidad_diciembre'] = vinculacion_accion_producto.cantidad_diciembre;                                                                
                                        consolidado_producto['cantidad_total'] = vinculacion_accion_producto.cantidad;
                                        console.log(consolidado_producto);
                                        console.log(vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta.area_id);
                                      }
                                     
                                    })
                                  vinculacion.push(consolidado_producto);
                              }  
                            }
                      })}
                        if (especifica.subespecificas.length > 0) {
                          especifica.subespecificas.map(subespecifica => { 2
                            if (subespecifica.productos.length > 0) {
                              subespecifica.productos.map(producto => {                             
                              let consolidado_producto = {};
                              if(producto.vinculacion_acciones_productos.length > 0) {
                                if (producto.entradas_solicitud_de_requerimientos.length > 0) {
                                  producto.vinculacion_acciones_productos.map(vinculacion_accion_producto => {
                                    if (vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta !== null){
                                      consolidado_producto['accion_id'] = vinculacion_accion_producto.accion_id;
                                      console.log(vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta.area_id);
                                      consolidado_producto['area_id'] = vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta.area_id;
                                      consolidado_producto['nombre_accion'] = vinculacion_accion_producto.acciones_recurrentes.accion_recurrente;
                                      consolidado_producto['id'] = vinculacion_accion_producto.id;
                                      consolidado_producto['producto_id'] = vinculacion_accion_producto.producto_id;
                                      consolidado_producto['subespecifica'] = `${partida.numero_partida}.${generica.numero_generica}.${especifica.numero_especifica}.${subespecifica.numero_subespecifica}`
                                      consolidado_producto['denominacion'] = subespecifica.denominacion;                                      
                                      consolidado_producto['producto'] = producto.nombre;
                                      consolidado_producto['codigo_producto'] = producto.codigo;
                                      consolidado_producto['precio_producto'] = producto.precio;
                                      consolidado_producto['iva_producto'] = producto.monto_iva;
                                      consolidado_producto['precio_total_producto'] = producto.total;
                                      consolidado_producto['monto_total_producto'] = vinculacion_accion_producto.cantidad * producto.total;
                                      consolidado_producto['unidad_de_medida'] = producto.unidad_de_medida.nombre;
                                      consolidado_producto['cantidad_enero'] = vinculacion_accion_producto.cantidad_enero;
                                      consolidado_producto['cantidad_febrero'] = vinculacion_accion_producto.cantidad_febrero;
                                      consolidado_producto['cantidad_marzo'] = vinculacion_accion_producto.cantidad_marzo;
                                      consolidado_producto['cantidad_abril'] = vinculacion_accion_producto.cantidad_abril;
                                      consolidado_producto['cantidad_mayo'] = vinculacion_accion_producto.cantidad_mayo;
                                      consolidado_producto['cantidad_junio'] = vinculacion_accion_producto.cantidad_junio;
                                      consolidado_producto['cantidad_julio'] = vinculacion_accion_producto.cantidad_julio;
                                      consolidado_producto['cantidad_agosto'] = vinculacion_accion_producto.cantidad_agosto;
                                      consolidado_producto['cantidad_septiembre'] = vinculacion_accion_producto.cantidad_septiembre;
                                      consolidado_producto['cantidad_octubre'] = vinculacion_accion_producto.cantidad_octubre;
                                      consolidado_producto['cantidad_noviembre'] = vinculacion_accion_producto.cantidad_noviembre;
                                      consolidado_producto['cantidad_diciembre'] = vinculacion_accion_producto.cantidad_diciembre;                                                                
                                      consolidado_producto['cantidad_total'] = vinculacion_accion_producto.cantidad;
                                  console.log(consolidado_producto);
                                  vinculacion.push(consolidado_producto);
                              }                            
                          })}}})}                        

              })
        }})
      }})
    }})}      
    res.json(vinculacion).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});



module.exports = router;
