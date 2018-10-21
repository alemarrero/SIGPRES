var express = require('express');
var router = express.Router();
var autorizarAdministrador = require('../controllers/autenticacion/autorizarAdministrador');
var recibirArchivo = require('../controllers/manejoDeArchivos/recibirArchivos');
var subirArchivo = require('../controllers/manejoDeArchivos/subirArchivo');
var actualizarArchivo = require('../controllers/manejoDeArchivos/actualizarArchivo');
var eliminarArchivo = require('../controllers/manejoDeArchivos/eliminarArchivo');
var models = require('../models');

/**
 * Endpoint que permite incluir un nuevo plan de la Contraloría Municipal en el sistema. Este endpoint recibe un multipart/form-data.
 * 
 * Parámetros (dentro del body):
 * @param {String} nombre nombre del plan a incluir.
 * @param {String} periodo periodo del plan a incluir.
 * @param {File} fichero archivo con el contenido del plan que será subido a Cloudinary.
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si el plan se pudo incluir correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/crear_plan_contraloria_municipal', recibirArchivo, subirArchivo("planes_cmb"), function(req, res, next) {
  models.planes_contraloria_municipal.create({
    nombre: req.body.nombre,
    periodo: req.body.periodo,
    fichero: req.public_id,
    enlace: req.file_url,
  })
  .then(x => {
    if(x){
      res.status(200).json('ok');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  });
});

/**
 * Endpoint que se encarga de actualizar los datos de un plan de la Contraloría Municipal.
 * 
 * Parámetros:
 * @param {Int} id id del plan de la Contraloría Municipal dentro de la base de datos.
 * @param {String} nombre nombre con el que se identifica el plan de la Contraloría Municipal
 * @param {String} periodo periodo al cual pertenece el plan de la Contraloría Municipal
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si el plan se pudo actualizar correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/actualizar_plan_contraloria_municipal', autorizarAdministrador, function(req, res){
  models.planes_contraloria_municipal.update({
    nombre: req.body.nombre,
    periodo: req.body.periodo,
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

/**
 * Endpoint que se encarga de actualizar los datos de un plan de la Contraloría Municipal.
 * 
 * Parámetros:
 * @param {Int} id id del plan de la Contraloría Municipal dentro de la base de datos.
 * @param {String} fichero_anterior public_id existente del archivo, utilizado para borrar el fichero anterior en Cloudinary.
 * @param {File} fichero archivo con el contenido del plan que será subido a Cloudinary.
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si el archivo del plan se pudo actualizar correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/actualizar_archivo_plan_contraloria_municipal', autorizarAdministrador, recibirArchivo, actualizarArchivo("planes_cmb"), function(req, res){
  models.planes_contraloria_municipal.findOne({where: {id: req.body.id}})
  .then(plan => {
    plan.fichero = req.public_id;
    plan.enlace = req.file_url;
    
    plan.save()
    .then(() => {
      res.status(200).json('ok');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('err');
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});
/**
 * Endpoint que se encarga de eliminar un plan de la Contraloría Municipal. Adicionalmente, 
 * borra el archivo de Cloudinary que tiene asociado.
 * 
 * Parámetros:
 * @param {Int} id id del plan de la Contraloría Municipal dentro de la base de datos.
 * @param {String} fichero public_id del archivo asignado por Cloudinary, usado para 
 * identificar el archivo dentro del servicio.
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si el plan se pudo eliminar correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/eliminar_plan_contraloria_municipal', autorizarAdministrador, eliminarArchivo, function(req, res){
  if(req.archivo_borrado || !req.archivo_borrado){
    models.planes_contraloria_municipal.destroy({where: {id: req.body.id}})
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
  }
});

/**
 * Endpoint que habilita un plan de la Contraloría Municipal en particular.
 * 
 * Parámetros:
 * @param {Int} id id del plan de la Contraloría Municipal.
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si el plan se pudo habilitar correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/habilitar_plan_contraloria_municipal', autorizarAdministrador, function(req, res){
  models.planes_contraloria_municipal.update({
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

/**
 * Endpoint que deshabilita un plan de la Contraloría Municipal en particular.
 * 
 * Parámetros:
 * @param {Int} id id del plan de la Contraloría Municipal.
 * 
 * Respuestas:
 * @return estado 200 y 'ok' si el plan se pudo deshabilitar correctamente.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.post('/deshabilitar_plan_contraloria_municipal', autorizarAdministrador, function(req, res){
  models.planes_contraloria_municipal.update({
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

/**
 * Endpoint que devuelve todos los planes de la Contraloría Municipal que se encuentran en la base de datos.
 * 
 /**
 * Endpoint que habilita un plan de la Contraloría Municipal en particular.
 * 
 * Parámetros:
 * @param {Int} id id del plan de la Contraloría Municipal.
 * 
 * Respuestas:
 * @return estado 200 y un arreglo de objetos que representan los planes de la Contraloría Municipal existentes
 * dentro de la base de datos.
 * @return estado 500 y 'err' si ocurrió algún error en el servidor.
 * @return estado 401 y 'err' si el usuario no se encuentra autenticado.
 * @return estado 403 y 'err' si el usuario no posee el rol necesario.
 */
router.get('/obtener_planes_contraloria_municipal', autorizarAdministrador, function(req, res){
  models.planes_contraloria_municipal.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

module.exports = router;
