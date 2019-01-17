var express = require('express');
var router = express.Router();
var autorizarDirector = require('../controllers/autenticacion/autorizarDirector');
var models = require('../models');
var XLSX = require('xlsx');

router.post('/crear_vinculacion_accion_producto', autorizarDirector, function(req, res, next) {
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


router.post('/actualizar_vinculacion_accion_producto', autorizarDirector, function(req, res){
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

router.post('/eliminar_vinculacion_accion_producto', autorizarDirector, function(req, res){
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

router.get('/obtener_vinculacion_acciones_productos', async function(req, res){
  await vinculacionAccionesProductos(res);
});

router.get('/obtener_reporte_vinculacion_acciones_productos', function(req, res){
  models.areas.findAll()
  .then( areas => {
  
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
                        where: {periodo: `${año}`, enviada: true},
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
                                      let area = areas.filter(area => area.id === vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta.area_id);
                                      let nombre_area = area[0].descripcion;                                      
                                      if (vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta !== null){
                                        consolidado_producto['accion_id'] = vinculacion_accion_producto.accion_id;
                                        consolidado_producto['area_id'] = vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta.area_id;
                                        consolidado_producto['nombre_area'] = nombre_area;
                                        consolidado_producto['nombre_accion'] = vinculacion_accion_producto.acciones_recurrentes.accion_recurrente;
                                        consolidado_producto['id'] = vinculacion_accion_producto.id;
                                        consolidado_producto['producto_id'] = vinculacion_accion_producto.producto_id;
                                        consolidado_producto['partida'] = `${partida.numero_partida}`
                                        consolidado_producto['generica'] = `${generica.numero_generica}`
                                        consolidado_producto['especifica'] = `${especifica.numero_especifica}`
                                        consolidado_producto['numero_subespecifica'] = `00`                                        
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
                                    let area = areas.filter(area => area.id === vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta.area_id);
                                    let nombre_area = area[0].descripcion;
                                    if (vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta !== null){
                                      consolidado_producto['accion_id'] = vinculacion_accion_producto.accion_id;
                                      consolidado_producto['area_id'] = vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta.area_id;
                                      consolidado_producto['nombre_area'] = nombre_area;
                                      consolidado_producto['nombre_accion'] = vinculacion_accion_producto.acciones_recurrentes.accion_recurrente;
                                      consolidado_producto['id'] = vinculacion_accion_producto.id;
                                      consolidado_producto['producto_id'] = vinculacion_accion_producto.producto_id;
                                      consolidado_producto['partida'] = `${partida.numero_partida}`
                                      consolidado_producto['generica'] = `${generica.numero_generica}`
                                      consolidado_producto['especifica'] = `${especifica.numero_especifica}`
                                      consolidado_producto['numero_subespecifica'] = `${subespecifica.numero_subespecifica}`
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
                                  vinculacion.push(consolidado_producto);
                              }                            
                          })}}})}                        

              })
        }})
      }})
    }})}      
    let vinculacion_data = parsearVinculacionPOAPresupuesto(vinculacion);
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet(vinculacion_data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vinculación POA y Presupuesto");
    res.setHeader('Content-Disposition', 'attachment; filename="VinculaciónPOAPresupuesto.' + "xls" + '";'); 
    res.end(XLSX.write(workbook, {type:"buffer", bookType:"xls"}));  
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })})
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })  
});

function vinculacionAccionesProductos(res){
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
                        where: {periodo: `${año}`, enviada: true},
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
  })}


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

router.get('/obtener_reporte_presupuesto_final', function(req, res){
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
  let presupuesto_data = parsearPresupuesto(presupuesto);
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(presupuesto_data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Presupuesto");
  res.setHeader('Content-Disposition', 'attachment; filename="PresupuestoFinal.' + "xls" + '";'); 
  res.end(XLSX.write(workbook, {type:"buffer", bookType:"xls"}));    
})
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_reporte_presupuesto_final', function(req, res){
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
  let presupuesto_data = parsearPresupuesto(presupuesto);
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(presupuesto_data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Presupuesto");
  res.setHeader('Content-Disposition', 'attachment; filename="PresupuestoFinal.' + "xls" + '";'); 
  res.end(XLSX.write(workbook, {type:"buffer", bookType:"xls"}));    
})
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});







router.get('/obtener_poa_financiero', function(req, res){
  let date = new Date();
  models.propuestas_plan_operativo_anual.findAll(
    { 
      include: [
        {
          model: models.areas, 
          as: "area",
          where: {id: req.session.area_id}
        },
        {
          model: models.objetivos_especificos, 
          as: "objetivos_especificos",
          separate: true,
          include: [{
            model: models.acciones_recurrentes,
            as: "acciones_recurrentes",
            separate: true,
            include: [
              {
                model: models.unidades_de_medida,
                as: "unidad_de_medida",
              },
              {
                model: models.medios_de_verificacion,
                as: "medio_de_verificacion"
              },
              {
                model: models.vinculacion_acciones_productos,
                as: "vinculacion_acciones_productos",
                separate: true,
                include: [
                  {
                    model: models.productos,
                    as: "productos"
                  }
                ]
              },
            ]
            
          }]
        },
      ]
    })
  .then(resultado => {
    let poa_data = parsearPropuestaPOAFinanciero(resultado); 

    //res.json(resultado).status(200);
    
    var workbook = XLSX.utils.book_new();

    var worksheet = XLSX.utils.aoa_to_sheet(poa_data);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "POA");

    // res.status(200).json(propuestas);
    res.setHeader('Content-Disposition', 'attachment; filename="POA_financiero.' + "xls" + '";'); 
    res.end(XLSX.write(workbook, {type:"buffer", bookType:"xls"}));
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});

router.get('/obtener_poa_financiero_full', function(req, res){
  let date = new Date();
  models.propuestas_plan_operativo_anual.findAll(
    { 
      include: [
        {
          model: models.areas, 
          as: "area",
        },
        {
          model: models.objetivos_especificos, 
          as: "objetivos_especificos",
          separate: true,
          include: [{
            model: models.acciones_recurrentes,
            as: "acciones_recurrentes",
            separate: true,
            include: [
              {
                model: models.unidades_de_medida,
                as: "unidad_de_medida",
              },
              {
                model: models.medios_de_verificacion,
                as: "medio_de_verificacion"
              },
              {
                model: models.vinculacion_acciones_productos,
                as: "vinculacion_acciones_productos",
                separate: true,
                include: [
                  {
                    model: models.productos,
                    as: "productos"
                  }
                ]
              },
            ]
            
          }]
        },
      ]
    })
  .then(resultado => {
    let poa_data = parsearPropuestaPOAFinanciero(resultado); 

    //res.json(resultado).status(200);
    
    var workbook = XLSX.utils.book_new();

    var worksheet = XLSX.utils.aoa_to_sheet(poa_data);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "POA");

    // res.status(200).json(propuestas);
    res.setHeader('Content-Disposition', 'attachment; filename="POA_financiero.' + "xls" + '";'); 
    res.end(XLSX.write(workbook, {type:"buffer", bookType:"xls"}));
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  })
});


function parsearPropuestaPOAFinanciero(propuestas){
  let filas = [["Actividad", "Unidad Ejecutora", "N° de Acción", "Nombre de la Acción", "Unidad de Medida", 
  "Valores totales programados", "Monto Total (BsS)", "MEDIO DE VERIFICACIÓN"]];
  
  if(propuestas.length !== undefined){
    propuestas.map(propuesta => {
      propuesta.objetivos_especificos.map(objetivo => {
        objetivo.acciones_recurrentes.map(accion_recurrente => {
          let monto_total_accion = 0;

          accion_recurrente.vinculacion_acciones_productos.map(vinculacion => {
            monto_total_accion = monto_total_accion + (vinculacion.cantidad * vinculacion.productos.total);
          });

          filas.push([
            "51", 
            propuesta.area.descripcion,
            accion_recurrente.id,
            accion_recurrente.accion_recurrente,
            accion_recurrente.unidad_de_medida.nombre, 
            accion_recurrente.meta_fisica_anual,
            monto_total_accion,  
            accion_recurrente.medio_de_verificacion.nombre
          ])
        })
      })
    })
  }
  else{
    propuestas.objetivos_especificos.map(objetivo => {
      objetivo.acciones_recurrentes.map(accion_recurrente => {
        let monto_total_accion = 0;

        accion_recurrente.vinculacion_acciones_productos.map(vinculacion => {
          monto_total_accion = monto_total_accion + (vinculacion.cantidad * vinculacion.productos.total);
        });

        filas.push([
          "51", 
          propuestas.area.descripcion,
          accion_recurrente.id,
          accion_recurrente.accion_recurrente,
          accion_recurrente.unidad_de_medida.nombre, 
          accion_recurrente.meta_fisica_anual,
          monto_total_accion,  
          accion_recurrente.medio_de_verificacion.nombre
        ])
      })
    })
  }

  return filas;
}

function parsearVinculacionPOAPresupuesto(vinculaciones){
    let filas = [["N° DE ACCIÓN", "UNIDAD EJECUTORA", "NOMBRE DE LA ACCION", 
    "CÓDIGO","PRODUCTO", "UNIDAD DE MEDIDA", 
    "PA","GEN", "ESP", "SUB-ESP", "SUBESPECIFICA", "DENOMINACION", "PRECIO UNITARIO", 
    "IVA", "MONTO TOTAL", "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP",
    "OCT", "NOV", "DIC", "TOTAL", "MONTO TOTAL (Bs.)"]];
    
  //  if(vinculaciones.length !== undefined){
      vinculaciones.map(vinculacion => {
        filas.push([
          vinculacion.accion_id,
          vinculacion.nombre_area,
          vinculacion.nombre_accion,
          vinculacion.codigo_producto,
          vinculacion.producto,
          vinculacion.unidad_de_medida,
          vinculacion.partida,
          vinculacion.generica,
          vinculacion.especifica,
          vinculacion.numero_subespecifica,
          vinculacion.subespecifica,
          vinculacion.denominacion,
          vinculacion.precio_producto,
          vinculacion.iva_producto,
          vinculacion.precio_total_producto,
          vinculacion.cantidad_enero,
          vinculacion.cantidad_febrero,
          vinculacion.cantidad_marzo,
          vinculacion.cantidad_abril,
          vinculacion.cantidad_mayo,
          vinculacion.cantidad_junio, 
          vinculacion.cantidad_julio,
          vinculacion.cantidad_agosto,
          vinculacion.cantidad_septiembre,
          vinculacion.cantidad_octubre,
          vinculacion.cantidad_noviembre,
          vinculacion.cantidad_diciembre,
          vinculacion.cantidad_total,
          vinculacion.monto_total_producto
        ])
      })
    //}
  
    return filas;
}

function parsearPresupuesto(presupuesto_final){
  let filas = [["PAR","GEN", "ESP", "SUB-ESP", "DENOMINACION", 
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", 
  "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE", 
  "PRESUPUESTO TOTAL (Bs.)"]];
  
//  if(presupuesto_final.length !== undefined){
    presupuesto_final.map(presupuesto => {
      if (presupuesto.es_partida === false){
      filas.push([
        presupuesto.partida,
        presupuesto.generica,
        presupuesto.especifica,
        presupuesto.subespecifica,
        presupuesto.denominacion,
        presupuesto.monto_enero,
        presupuesto.monto_febrero,
        presupuesto.monto_marzo,
        presupuesto.monto_abril,
        presupuesto.monto_mayo,
        presupuesto.monto_junio, 
        presupuesto.monto_julio,
        presupuesto.monto_agosto,
        presupuesto.monto_septiembre,
        presupuesto.monto_octubre,
        presupuesto.monto_noviembre,
        presupuesto.monto_diciembre,
        presupuesto.monto_total
      ])
    }
    else {
      let partida = "Total " + presupuesto.partida;
      filas.push([
        partida, " ", " ", " ",
        presupuesto.denominacion,
        presupuesto.monto_enero,
        presupuesto.monto_febrero,
        presupuesto.monto_marzo,
        presupuesto.monto_abril,
        presupuesto.monto_mayo,
        presupuesto.monto_junio, 
        presupuesto.monto_julio,
        presupuesto.monto_agosto,
        presupuesto.monto_septiembre,
        presupuesto.monto_octubre,
        presupuesto.monto_noviembre,
        presupuesto.monto_diciembre,
        presupuesto.monto_total
      ])      
    }
  })

  return filas;
}

router.get('/obtener_reporte_presupuesto_final_por_partida', function(req, res){
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
        var monto_partida_total = 0;                                                                                  
        let monto_partida = {};        
          if(partida.genericas.length > 0){
              partida.genericas.map(generica => {
                  if(generica.especificas.length > 0){
                      generica.especificas.map(especifica => { 
                        if (especifica.productos.length > 0) {                                                           
                          var monto_total = 0;                                                                                  
                          let monto_subespecifica = {};
                          especifica.productos.map(producto => {                                                                 
                            var cantidad_total = 0;                                                                                  
                            if(producto.vinculacion_acciones_productos.length > 0) {
                              producto.vinculacion_acciones_productos.map(vinculacion_accion_producto => {
                                if (vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta !== null){                                                                               
                                  cantidad_total = cantidad_total + vinculacion_accion_producto.cantidad;
                                }
                              }
                              )
                              monto_total = monto_total + (cantidad_total * producto.total);  
                            }
                          })
                          if (monto_total !== 0) {                                                               
                            monto_subespecifica['monto_total'] = monto_total.toFixed(2);
                            monto_subespecifica['es_partida'] = false;
                            monto_partida_total = monto_partida_total + monto_total;                            
                            presupuesto.push(monto_subespecifica);
                          }
                        }
                        if (especifica.subespecificas.length > 0) {                                                         
                            var monto_total = 0;                                                                                  
                            let monto_subespecifica = {};
                          especifica.subespecificas.map(subespecifica => { 
                            if (subespecifica.productos.length > 0) {
                              subespecifica.productos.map(producto => {                                                                                        
                                var cantidad_total = 0;                                  
                                if(producto.vinculacion_acciones_productos.length > 0) {
                                  producto.vinculacion_acciones_productos.map(vinculacion_accion_producto => {
                                    if (vinculacion_accion_producto.acciones_recurrentes.objetivo_especifico.propuesta !== null){                                                                               
                                    cantidad_total = cantidad_total + vinculacion_accion_producto.cantidad;
                                  }
                                })
                                monto_total = monto_total + (cantidad_total * producto.total);  
                              }
                            })
                            if (monto_total !== 0) {                                                             
                              monto_subespecifica['monto_total'] = monto_total.toFixed(2);
                              monto_subespecifica['es_partida'] = false;
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
          monto_partida['monto_total'] = monto_partida_total.toFixed(2);   
          monto_partida['es_partida'] = true;
          presupuesto.push(monto_partida);
        }     
      }
    )
  }      
  let presupuesto_data = parsearPresupuestoPartida(presupuesto);
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(presupuesto_data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Resumen Por Partidas");
  res.setHeader('Content-Disposition', 'attachment; filename="ResumenCréditosPresupuestariosPorPartidas.' + "xls" + '";'); 
  res.end(XLSX.write(workbook, {type:"buffer", bookType:"xls"}));    
})
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

function parsearPresupuestoPartida(presupuesto_final){
  let filas = [["PARTIDA","GENÉRICA", "ESPECÍFICA", "SUB-ESPECÍFICA", "DENOMINACION DE LA PARTIDA", 
  "PROYECTO PRESUPUESTO (Bs.)"]];
  
//  if(presupuesto_final.length !== undefined){
    let total_presupuesto = 0;
    presupuesto_final.map(presupuesto => {
      if (presupuesto.es_partida === true){
        total_presupuesto = total_presupuesto + parseFloat(presupuesto.monto_total, 10);
        filas.push([
          presupuesto.partida,
          presupuesto.generica,
          presupuesto.especifica,
          presupuesto.subespecifica,
          presupuesto.denominacion,
          presupuesto.monto_total
        ])
      }
    }
  )
  filas.push(["","","","","Total Presupuesto Bs.", total_presupuesto])
  return filas;
}
module.exports = router;
