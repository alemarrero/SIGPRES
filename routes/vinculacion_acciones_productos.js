
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
                              if(producto.vinculacion_acciones_productos.length > 0) {
                                if (producto.entradas_solicitud_de_requerimientos.length > 0) {
                                    producto.vinculacion_acciones_productos.map(vinculacion_accion_producto => {
                                      let consolidado_producto = {};
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
                                      vinculacion.push(consolidado_producto);
                                     
                                    })
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

router.get('/obtener_presupuesto_final', function(req, res){
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
router.get('/obtener_presupuesto_final', function(req, res){
  let presupuesto = [];
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
        var monto_partida_enero = 0;
        var monto_partida_febrero = 0;
        var monto_partida_marzo = 0;
        var monto_partida_abril = 0;
        var monto_partida_mayo = 0;
        var monto_partida_junio = 0;
        var monto_partida_julio = 0;
        var monto_partida_agosto = 0;
        var monto_partida_septiembre = 0;
        var monto_partida_octubre = 0;
        var monto_partida_noviembre = 0;
        var monto_partida_diciembre = 0;                                                            
        var monto_partida_total = 0;                                                                                  
        let monto_partida = {};        
          if(partida.genericas.length > 0){
              partida.genericas.map(generica => {
                  if(generica.especificas.length > 0){
                      generica.especificas.map(especifica => { 
                        if (especifica.productos.length > 0) {
                          var monto_enero = 0;
                          var monto_febrero = 0;
                          var monto_marzo = 0;
                          var monto_abril = 0;
                          var monto_mayo = 0;
                          var monto_junio = 0;
                          var monto_julio = 0;
                          var monto_agosto = 0;
                          var monto_septiembre = 0;
                          var monto_octubre = 0;
                          var monto_noviembre = 0;
                          var monto_diciembre = 0;                                                            
                          var monto_total = 0;                                                                                  
                          let monto_subespecifica = {};
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
                            if(producto.vinculacion_acciones_productos.length > 0) {
                              producto.vinculacion_acciones_productos.map(vinculacion_accion_producto => {
                                if (vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta !== null){
                                  cantidad_enero = cantidad_enero + vinculacion_accion_producto.cantidad_enero;
                                  cantidad_febrero = cantidad_febrero + vinculacion_accion_producto.cantidad_febrero;
                                  cantidad_marzo = cantidad_marzo + vinculacion_accion_producto.cantidad_marzo;
                                  cantidad_abril = cantidad_abril + vinculacion_accion_producto.cantidad_abril;
                                  cantidad_mayo = cantidad_mayo + vinculacion_accion_producto.cantidad_mayo;
                                  cantidad_junio = cantidad_junio + vinculacion_accion_producto.cantidad_junio;
                                  cantidad_julio = cantidad_julio + vinculacion_accion_producto.cantidad_julio;
                                  cantidad_agosto = cantidad_agosto + vinculacion_accion_producto.cantidad_agosto;
                                  cantidad_septiembre = cantidad_septiembre + vinculacion_accion_producto.cantidad_septiembre;
                                  cantidad_octubre = cantidad_octubre + vinculacion_accion_producto.cantidad_octubre;
                                  cantidad_noviembre = cantidad_noviembre + vinculacion_accion_producto.cantidad_noviembre;
                                  cantidad_diciembre = cantidad_diciembre + vinculacion_accion_producto.cantidad_diciembre;                                                                                
                                  cantidad_total = cantidad_total + vinculacion_accion_producto.cantidad;
                                }
                              }
                              )
                              monto_enero = monto_enero + (cantidad_enero * producto.total); 
                              monto_febrero = monto_febrero + (cantidad_febrero * producto.total); 
                              monto_marzo = monto_marzo + (cantidad_marzo * producto.total); 
                              monto_abril = monto_abril + (cantidad_abril * producto.total); 
                              monto_mayo = monto_mayo + (cantidad_mayo * producto.total); 
                              monto_junio = monto_junio + (cantidad_junio * producto.total); 
                              monto_julio = monto_julio + (cantidad_julio * producto.total); 
                              monto_agosto = monto_agosto + (cantidad_agosto * producto.total); 
                              monto_septiembre = monto_septiembre + (cantidad_septiembre * producto.total); 
                              monto_octubre = monto_octubre + (cantidad_octubre * producto.total); 
                              monto_noviembre = monto_noviembre + (cantidad_noviembre * producto.total); 
                              monto_diciembre = monto_diciembre + (cantidad_diciembre * producto.total); 
                              monto_total = monto_total + (cantidad_total * producto.total);  
                            }
                          })
                          if (monto_total !== 0) {
                            monto_subespecifica['partida'] = `${partida.numero_partida}`
                            monto_subespecifica['generica'] = `${generica.numero_generica}`
                            monto_subespecifica['especifica'] = `${especifica.numero_especifica}`
                            monto_subespecifica['subespecifica'] = `00`
                            monto_subespecifica['denominacion'] = especifica.denominacion;                               
                            monto_subespecifica['monto_enero'] = monto_enero.toFixed(2);
                            monto_subespecifica['monto_febrero'] = monto_febrero.toFixed(2);
                            monto_subespecifica['monto_marzo'] = monto_marzo.toFixed(2);
                            monto_subespecifica['monto_abril'] = monto_abril.toFixed(2);
                            monto_subespecifica['monto_mayo'] = monto_mayo.toFixed(2);
                            monto_subespecifica['monto_junio'] = monto_junio.toFixed(2);
                            monto_subespecifica['monto_julio'] = monto_julio.toFixed(2);
                            monto_subespecifica['monto_agosto'] = monto_agosto.toFixed(2);
                            monto_subespecifica['monto_septiembre'] = monto_septiembre.toFixed(2);
                            monto_subespecifica['monto_octubre'] = monto_octubre.toFixed(2);
                            monto_subespecifica['monto_noviembre'] = monto_noviembre.toFixed(2);
                            monto_subespecifica['monto_diciembre'] = monto_diciembre.toFixed(2);                                                                
                            monto_subespecifica['monto_total'] = monto_total.toFixed(2);
                            monto_subespecifica['es_partida'] = false;
                            monto_partida_enero = monto_partida_enero + monto_enero; 
                            monto_partida_febrero = monto_partida_febrero + monto_febrero; 
                            monto_partida_marzo = monto_partida_marzo + monto_marzo; 
                            monto_partida_abril = monto_partida_abril + monto_abril; 
                            monto_partida_mayo = monto_partida_mayo + monto_mayo; 
                            monto_partida_junio = monto_partida_junio + monto_junio; 
                            monto_partida_julio = monto_partida_julio + monto_julio; 
                            monto_partida_agosto = monto_partida_agosto + monto_agosto; 
                            monto_partida_septiembre = monto_partida_septiembre + monto_septiembre; 
                            monto_partida_octubre = monto_partida_octubre + monto_octubre; 
                            monto_partida_noviembre = monto_partida_noviembre + monto_noviembre; 
                            monto_partida_diciembre = monto_partida_diciembre + monto_diciembre; 
                            monto_partida_total = monto_partida_total + monto_total;                            
                            presupuesto.push(monto_subespecifica);
                          }
                        }
                        if (especifica.subespecificas.length > 0) {
                            var monto_enero = 0;
                            var monto_febrero = 0;
                            var monto_marzo = 0;
                            var monto_abril = 0;
                            var monto_mayo = 0;
                            var monto_junio = 0;
                            var monto_julio = 0;
                            var monto_agosto = 0;
                            var monto_septiembre = 0;
                            var monto_octubre = 0;
                            var monto_noviembre = 0;
                            var monto_diciembre = 0;                                                            
                            var monto_total = 0;                                                                                  
                            let monto_subespecifica = {};
                          especifica.subespecificas.map(subespecifica => { 
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
                                if(producto.vinculacion_acciones_productos.length > 0) {
                                  producto.vinculacion_acciones_productos.map(vinculacion_accion_producto => {
                                    if (vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta !== null){
                                    cantidad_enero = cantidad_enero + vinculacion_accion_producto.cantidad_enero;
                                    cantidad_febrero = cantidad_febrero + vinculacion_accion_producto.cantidad_febrero;
                                    cantidad_marzo = cantidad_marzo + vinculacion_accion_producto.cantidad_marzo;
                                    cantidad_abril = cantidad_abril + vinculacion_accion_producto.cantidad_abril;
                                    cantidad_mayo = cantidad_mayo + vinculacion_accion_producto.cantidad_mayo;
                                    cantidad_junio = cantidad_junio + vinculacion_accion_producto.cantidad_junio;
                                    cantidad_julio = cantidad_julio + vinculacion_accion_producto.cantidad_julio;
                                    cantidad_agosto = cantidad_agosto + vinculacion_accion_producto.cantidad_agosto;
                                    cantidad_septiembre = cantidad_septiembre + vinculacion_accion_producto.cantidad_septiembre;
                                    cantidad_octubre = cantidad_octubre + vinculacion_accion_producto.cantidad_octubre;
                                    cantidad_noviembre = cantidad_noviembre + vinculacion_accion_producto.cantidad_noviembre;
                                    cantidad_diciembre = cantidad_diciembre + vinculacion_accion_producto.cantidad_diciembre;                                                                                
                                    cantidad_total = cantidad_total + vinculacion_accion_producto.cantidad;
                                  }
                                })
                                monto_enero = monto_enero + (cantidad_enero * producto.total); 
                                monto_febrero = monto_febrero + (cantidad_febrero * producto.total); 
                                monto_marzo = monto_marzo + (cantidad_marzo * producto.total); 
                                monto_abril = monto_abril + (cantidad_abril * producto.total); 
                                monto_mayo = monto_mayo + (cantidad_mayo * producto.total); 
                                monto_junio = monto_junio + (cantidad_junio * producto.total); 
                                monto_julio = monto_julio + (cantidad_julio * producto.total); 
                                monto_agosto = monto_agosto + (cantidad_agosto * producto.total); 
                                monto_septiembre = monto_septiembre + (cantidad_septiembre * producto.total); 
                                monto_octubre = monto_octubre + (cantidad_octubre * producto.total); 
                                monto_noviembre = monto_noviembre + (cantidad_noviembre * producto.total); 
                                monto_diciembre = monto_diciembre + (cantidad_diciembre * producto.total); 
                                monto_total = monto_total + (cantidad_total * producto.total);  
                              }
                            })
                            if (monto_total !== 0) {
                              monto_subespecifica['partida'] = `${partida.numero_partida}`
                              monto_subespecifica['generica'] = `${generica.numero_generica}`
                              monto_subespecifica['especifica'] = `${especifica.numero_especifica}`
                              monto_subespecifica['subespecifica'] = `${subespecifica.numero_subespecifica}`
                              monto_subespecifica['denominacion'] = subespecifica.denominacion;                               
                              monto_subespecifica['monto_enero'] = monto_enero.toFixed(2);
                              monto_subespecifica['monto_febrero'] = monto_febrero.toFixed(2);
                              monto_subespecifica['monto_marzo'] = monto_marzo.toFixed(2);
                              monto_subespecifica['monto_abril'] = monto_abril.toFixed(2);
                              monto_subespecifica['monto_mayo'] = monto_mayo.toFixed(2);
                              monto_subespecifica['monto_junio'] = monto_junio.toFixed(2);
                              monto_subespecifica['monto_julio'] = monto_julio.toFixed(2);
                              monto_subespecifica['monto_agosto'] = monto_agosto.toFixed(2);
                              monto_subespecifica['monto_septiembre'] = monto_septiembre.toFixed(2);
                              monto_subespecifica['monto_octubre'] = monto_octubre.toFixed(2);
                              monto_subespecifica['monto_noviembre'] = monto_noviembre.toFixed(2);
                              monto_subespecifica['monto_diciembre'] = monto_diciembre.toFixed(2);                                                                
                              monto_subespecifica['monto_total'] = monto_total.toFixed(2);
                              monto_subespecifica['es_partida'] = false;
                              monto_partida_enero = monto_partida_enero + monto_enero; 
                              monto_partida_febrero = monto_partida_febrero + monto_febrero; 
                              monto_partida_marzo = monto_partida_marzo + monto_marzo; 
                              monto_partida_abril = monto_partida_abril + monto_abril; 
                              monto_partida_mayo = monto_partida_mayo + monto_mayo; 
                              monto_partida_junio = monto_partida_junio + monto_junio; 
                              monto_partida_julio = monto_partida_julio + monto_julio; 
                              monto_partida_agosto = monto_partida_agosto + monto_agosto; 
                              monto_partida_septiembre = monto_partida_septiembre + monto_septiembre; 
                              monto_partida_octubre = monto_partida_octubre + monto_octubre; 
                              monto_partida_noviembre = monto_partida_noviembre + monto_noviembre; 
                              monto_partida_diciembre = monto_partida_diciembre + monto_diciembre; 
                              monto_partida_total = monto_partida_total + monto_total;                              
                              presupuesto.push(monto_subespecifica);
                            }
                          }
                        }
                      )                    
                    }
                  }
                )
              }
            }
          )
        }
        if (monto_partida_total !== 0) {
          monto_partida['partida'] = `${partida.numero_partida}`
          monto_partida['generica'] = `00`
          monto_partida['especifica'] = `00`
          monto_partida['subespecifica'] = `00`
          monto_partida['denominacion'] = partida.denominacion;                               
          monto_partida['monto_enero'] = monto_partida_enero.toFixed(2);
          monto_partida['monto_febrero'] = monto_partida_febrero.toFixed(2);
          monto_partida['monto_marzo'] = monto_partida_marzo.toFixed(2);
          monto_partida['monto_abril'] = monto_partida_abril.toFixed(2);
          monto_partida['monto_mayo'] = monto_partida_mayo.toFixed(2);
          monto_partida['monto_junio'] = monto_partida_junio.toFixed(2);
          monto_partida['monto_julio'] = monto_partida_julio.toFixed(2);
          monto_partida['monto_agosto'] = monto_partida_agosto.toFixed(2);
          monto_partida['monto_septiembre'] = monto_partida_septiembre.toFixed(2);
          monto_partida['monto_octubre'] = monto_partida_octubre.toFixed(2);
          monto_partida['monto_noviembre'] = monto_partida_noviembre.toFixed(2);
          monto_partida['monto_diciembre'] = monto_partida_diciembre.toFixed(2);                                                                
          monto_partida['monto_total'] = monto_partida_total.toFixed(2);   
          monto_partida['es_partida'] = true;
          presupuesto.push(monto_partida);
        }     
      }
    )
  }      
    res.json(presupuesto).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
