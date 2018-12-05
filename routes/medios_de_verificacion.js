var express = require('express');
var router = express.Router();
var autorizarDirectorPP = require('../controllers/autenticacion/autorizarDirectorPP');
var models = require('../models');
var recibirArchivo = require('../controllers/manejoDeArchivos/recibirArchivos');
var XLSX = require('xlsx');

router.post('/crear_medio_de_verificacion', autorizarDirectorPP, function(req, res, next) {
  models.medios_de_verificacion.create({
    nombre: req.body.nombre 
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


router.post('/actualizar_medio_de_verificacion', autorizarDirectorPP, function(req, res){
  models.medios_de_verificacion.update({
    nombre: req.body.nombre,
    habilitado: req.body.habilitado
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

router.post('/eliminar_medio_de_verificacion', autorizarDirectorPP, function(req, res){
  models.medios_de_verificacion.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_medio_de_verificacion', autorizarDirectorPP, function(req, res){
  models.medios_de_verificacion.update({
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

router.post('/deshabilitar_medio_de_verificacion', autorizarDirectorPP, function(req, res){
  models.medios_de_verificacion.update({
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

router.get('/obtener_medios_de_verificacion', function(req, res){
  models.medios_de_verificacion.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/cargar_medios_de_verificacion', autorizarDirectorPP, recibirArchivo, function(req, res){
  // Contiene el archivo XLS subido por el usuario
  const workbook = XLSX.readFile(req.file.path);
  const medios_de_verificacion = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

  // Se introducen las unidades de medida en la base de datos
  cargarMediosDeVerificacion(medios_de_verificacion, res);
});

function cargarMediosDeVerificacion(medios_de_verificacion, res){
  Promise.all(medios_de_verificacion.map(medio => {
    // Se hace una búsqueda del medio de verificación a través de su nombre
    models.medios_de_verificacion.findOne({where: {nombre: medio.nombre}})
    .then(resultado => {
      // Luego se verifica si la búsqueda arrojó algún resultado.
      // Los medios de verificación solo se insertan si la búsqueda no arroja resultado alguno ( resultado es null )
      if(resultado === null || !resultado){
        models.medios_de_verificacion.create({
          nombre: medio.nombre
        })
        .then(resultado_creacion => {
          if(resultado_creacion){
            console.log(`Medio de verificación '${medio.nombre}' creado exitosamente.`);
          }
        })
        .catch(err => {
          console.log(`Error al crear el medio de verificación: `);
          console.log(medio);
          console.log(`Información del error:`);
          console.log(err);
          res.status(500).json("err");
        });
      }
    })
    .catch(err => {
      console.log(`Error al crear el medio de verificación: `);
      console.log(medio);
      console.log(`Información del error:`);
      console.log(err);
      res.status(500).json("err");
    });
  }))
  .then(() => {
    res.status(200).json("ok");
  })
  .catch(err => {
    console.log(err);
    res.status(500).json("err");
  });
}

module.exports = router;
