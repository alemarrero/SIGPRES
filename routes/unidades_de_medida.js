var express = require('express');
var router = express.Router();
var autorizarDirectorPP = require('../controllers/autenticacion/autorizarDirectorPP');
var models = require('../models');
var recibirArchivo = require('../controllers/manejoDeArchivos/recibirArchivos');
var XLSX = require('xlsx');

router.post('/crear_unidad_de_medida', autorizarDirectorPP, function(req, res, next) {
  models.unidades_de_medida.create({
    nombre: req.body.nombre,
    tipo: req.body.tipo 
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


router.post('/actualizar_unidad_de_medida', autorizarDirectorPP, function(req, res){
  models.unidades_de_medida.update({
    nombre: req.body.nombre,
    habilitado: req.body.habilitado,
    tipo: req.body.tipo 
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

router.post('/eliminar_unidad_de_medida', autorizarDirectorPP, function(req, res){
  models.unidades_de_medida.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_unidad_de_medida', autorizarDirectorPP, function(req, res){
  models.unidades_de_medida.update({
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

router.post('/deshabilitar_unidad_de_medida', autorizarDirectorPP, function(req, res){
  models.unidades_de_medida.update({
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

router.get('/obtener_unidades_de_medida', function(req, res){
  models.unidades_de_medida.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_unidades_de_medida_productos', function(req, res){
  models.unidades_de_medida.findAll({where: {tipo: "productos"}})
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_unidades_de_medida_acciones_recurrentes', function(req, res){
  models.unidades_de_medida.findAll({where: {tipo: "acciones recurrentes"}})
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/cargar_unidades_de_medida_ar', autorizarDirectorPP, recibirArchivo, function(req, res){
  // Contiene el archivo XLS subido por el usuario
  const workbook = XLSX.readFile(req.file.path);
  const unidades_de_medida = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

  // Se introducen las unidades de medida en la base de datos
  cargarUnidadesDeMedida(unidades_de_medida, 'acciones recurrentes', res);
});

router.post('/cargar_unidades_de_medida_prod', recibirArchivo, function(req, res){
  // Contiene el archivo XLS subido por el usuario
  const workbook = XLSX.readFile(req.file.path);
  const unidades_de_medida = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]]);

  // Se introducen las unidades de medida en la base de datos
  cargarUnidadesDeMedida(unidades_de_medida, 'productos', res);
});

function cargarUnidadesDeMedida(unidades_de_medida, tipo, res){
  Promise.all(unidades_de_medida.map(unidad => {
    // Se hace una búsqueda de la unidad de medida a través de su nombre
    models.unidades_de_medida.findOne({where: {nombre: unidad.nombre, tipo: tipo}})
    .then(resultado => {
      // Luego se verifica si la búsqueda arrojó algún resultado.
      // Las unidades de medida solo se insertan si la búsqueda no arroja resultado alguno ( resultado es null )
      if(resultado === null){
        models.unidades_de_medida.create({
          nombre: unidad.nombre,
          tipo: tipo
        })
        .then(resultado_creacion => {
          if(resultado_creacion){
            console.log(`Unidad de medida '${unidad.nombre}' creada exitosamente.`);
          }
        })
        .catch(err => {
          console.log(`Error al crear la unidad de medida: `);
          console.log(unidad);
          console.log(`Información del error:`);
          console.log(err);
          res.status(500).json("err");
        });
      }
    })
    .catch(err => {
      console.log(`Error al crear la unidad de medida: `);
      console.log(unidad);
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
