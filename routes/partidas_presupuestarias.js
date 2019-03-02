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

router.post('/crear_partida_presupuestaria', autorizarDirectorPP, function(req, res, next) {
  models.partidas_presupuestarias
  .create({
    numero_partida: req.body.numero_partida, 
    denominacion: req.body.denominacion
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



router.post('/actualizar_partida_presupuestaria', autorizarDirectorPP, function(req, res){
  models.partidas_presupuestarias.update({
    numero_partida: req.body.numero_partida,
    habilitado: req.body.habilitado,
    denominacion: req.body.denominacion
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

router.post('/eliminar_partida_presupuestaria', autorizarDirectorPP, function(req, res){
  models.partidas_presupuestarias.destroy({where: {id: req.body.id}})
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


router.post('/habilitar_partida_presupuestaria', autorizarDirectorPP, function(req, res){
  models.partidas_presupuestarias.update({
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

router.post('/deshabilitar_partida_presupuestaria', autorizarDirectorPP, function(req, res){
  models.partidas_presupuestarias.update({
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

router.get('/obtener_partidas_presupuestarias', function(req, res){
  models.partidas_presupuestarias.findAll()
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.post('/obtener_partida_presupuestaria', function(req, res){
  models.partidas_presupuestarias.findOne({
    where: {numero_partida: req.body.numero_partida}
  })
  .then( resultado => {
    res.json(resultado).status(200);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('err');
  })
});

router.get('/obtener_partidas_completas', cache(604800000), function(req,res){
  models.partidas_presupuestarias.findAll({
    attributes: ["id", "numero_partida", "denominacion"], 
    include: [
      {
        model: models.genericas,
        as: "genericas",
        attributes: ["id", "numero_generica", "denominacion"],
        include: [
          {
            model: models.especificas,
            as: "especificas",
            attributes: ["id", "numero_especifica", "denominacion"],
            include: [
              {
                model: models.subespecificas,
                as: "subespecificas",
                attributes: ["id", "numero_subespecifica", "denominacion"]
              }
            ]
          }
        ]
      }
    ]
  })
  .then(resultado => {
    res.status(200).json(resultado)
  })
  .catch(err => {
    console.log(err);

    res.status(500).json("err");
  })

});

router.post('/obtener_partida_desde_especifica', cache(604800000), function(req,res){
  models.especificas.findOne({
    where: {id: req.body.id},
    include: [
      {
        model: models.genericas,
        as: "generica",
        attributes: ["id", "numero_generica", "denominacion"],
        include: [
          {
            model: models.partidas_presupuestarias,
            as: "partida_presupuestaria",
            attributes: ["id", "numero_partida", "denominacion"]
          }
        ]
      }
    ]
  }
  )
  .then(resultado => {
    res.status(200).json(resultado)
  })
  .catch(err => {
    console.log(err);

    res.status(500).json("err");
  })
});

router.post('/obtener_partida_desde_subespecifica', cache(604800000), function(req,res){
  models.subespecificas.findOne({
    where: {id: req.body.id},
    include: [
      {
        model: models.especificas,
        as: "especifica",
        attributes: ["id", "numero_especifica", "denominacion"],
        include: [
          {
            model: models.genericas,
            as: "generica",
            attributes: ["id", "numero_generica", "denominacion"],
            include: [
              {
                model: models.partidas_presupuestarias,
                as: "partida_presupuestaria",
                attributes: ["id", "numero_partida", "denominacion"]
              }
            ]
          }
        ]
      }
    ]
  })
  .then(resultado => {
    res.status(200).json(resultado)
  })
  .catch(err => {
    console.log(err);

    res.status(500).json("err");
  })

});

router.post('/cargar_partidas', recibirArchivo, async function(req, res, next){
  // Contiene el archivo XLS subido por el usuario
  const workbook = XLSX.readFile(req.file.path);
  const cuentas = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[2]]);
  let partidas = cuentas.filter(cuenta => cuenta.tipo === "partida presupuestaria");

  // Se introducen las partidas en la base de datos
  cargarPartidasPresupuestarias(partidas, res, next);
  }
);

router.post('/cargar_genericas', recibirArchivo, async function(req, res, next){
  // Contiene el archivo XLS subido por el usuario
  const workbook = XLSX.readFile(req.file.path);
  const cuentas = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[2]]);
  let genericas = cuentas.filter(cuenta => cuenta.tipo === "generica");

  // // Se introducen las genéricas
  cargarPartidasGenericas(genericas, res, next);
  }
);

router.post('/cargar_especificas', recibirArchivo, async function(req, res, next){
  // Contiene el archivo XLS subido por el usuario
  const workbook = XLSX.readFile(req.file.path);
  const cuentas = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[2]]);
  let especificas = cuentas.filter(cuenta => cuenta.tipo === "especifica");

  // // Se introducen las específicas
  await cargarPartidasEspecificas(especificas, res, next);
  }
);

router.post('/cargar_subespecificas', recibirArchivo, async function(req, res, next){
  // Contiene el archivo XLS subido por el usuario
  const workbook = XLSX.readFile(req.file.path);
  const cuentas = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[2]]);
  let subespecificas = cuentas.filter(cuenta => cuenta.tipo === "subespecifica");

  // Se introducen las subespecíficas
  await cargarPartidasSubespecificas(subespecificas, res, next);
  }
);


module.exports = router;

async function cargarPartidasSubespecificas(subespecificas, res, next) {
  Promise.all(subespecificas.map(subespecifica => {
    let numero_partida = subespecifica.numero.split(".");
    let numero_especifica = `${numero_partida[3]}`;
    let numero_subespecifica = `${numero_partida[4]}`;
    let numero_generica = `${numero_partida[2]}`;
    let id_partida_especifica;
    // Primero se busca en la base de datos el id de la partida específica a la cual
    // está asociada la subespecífica
    models.partidas_presupuestarias.findOne({ where: { numero_partida: `${numero_partida[0]}${numero_partida[1]}` } })
    .then(partida_presupuestaria => {
      models.genericas.findOne({ where: { numero_generica: numero_generica, partida_presupuestaria_id: partida_presupuestaria.dataValues.id } })
        .then(partida_generica => {
          id_partida_generica = partida_generica.dataValues.id;
          // Se busca en la base de datos si la específica ya existe
          models.especificas.findOne({ where: { numero_especifica: numero_especifica, generica_id: id_partida_generica } })
            .then(partida_especifica => {
              id_partida_especifica = partida_especifica.dataValues.id;
              // Se busca en la base de datos si la subespecífica ya existe
              models.subespecificas.findOne({ where: { numero_subespecifica: numero_subespecifica, especifica_id: id_partida_especifica } })
                .then(resultado => {
                  // Si ya existe, entonces se actualiza con la nueva información
                  if (resultado) {
                    models.subespecificas.update({ denominacion: subespecifica.denominacion }, { where: { id: resultado.dataValues.id } })
                      .then(subespecifica_actualizada => {
                        if (subespecifica_actualizada[0]) {
                          console.log(`Partida subespecífica ${numero_partida[0]}${numero_partida[1]}.${numero_partida[2]}.${numero_especifica}.${numero_subespecifica} actualizada correctamente.`);
                        }
                      })
                      .catch(err => {
                        console.log(err);
                        // res.status(500).json("err");
                      });
                  }
                  else {
                    // De lo contrario, entonces se crea la subespecífica
                    models.subespecificas.create({
                      numero_subespecifica: numero_subespecifica,
                      denominacion: subespecifica.denominacion,
                      especifica_id: id_partida_especifica
                    })
                    .then(subespecifica_creada => {
                      if (subespecifica_creada) {
                        console.log(`Partida subespecífica ${numero_partida[0]}${numero_partida[1]}.${numero_partida[2]}.${numero_especifica}.${numero_subespecifica} creada correctamente.`);
                      }
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json("err");
                    });
                  }
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json("err");

                });
            })
            .catch(err => {
              console.log("Error al buscar la información de la partida específica " + numero_especifica + " con id de genérica: " + id_partida_generica);
              console.log(err);
              res.status(500).json("err");
            });    
        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json("err");
    });
  }))
  .then(() => {
    res.json("ok").status(200);
  });
}

async function cargarPartidasEspecificas(especificas, res, next) {
  Promise.all(especificas.map(especifica => {
    let numero_partida = especifica.numero.split(".");
    let numero_generica = `${numero_partida[2]}`;
    let numero_especifica = `${numero_partida[3]}`;
    let id_partida_generica;
    // Primero se busca en la base de datos el id de la partida genérica a la cual
    // está asociada la específica
    models.partidas_presupuestarias.findOne({ where: { numero_partida: `${numero_partida[0]}${numero_partida[1]}` } })
    .then(partida_presupuestaria => {
      models.genericas.findOne({ where: { numero_generica: numero_generica, partida_presupuestaria_id: partida_presupuestaria.dataValues.id } })
        .then(partida_generica => {
          id_partida_generica = partida_generica.dataValues.id;
          // Se busca en la base de datos si la específica ya existe
          models.especificas.findOne({ where: { numero_especifica: numero_especifica, generica_id: id_partida_generica } })
            .then(resultado => {
              // Si ya existe, entonces se actualiza con la nueva información
              if (resultado) {
                models.especificas.update({ denominacion: especifica.denominacion }, { where: { id: resultado.dataValues.id } })
                  .then(especifica_actualizada => {
                    if (especifica_actualizada[0]) {
                      console.log(`Partida específica ${numero_partida[0]}${numero_partida[1]}.${numero_partida[2]}.${numero_especifica}.00 actualizada correctamente.`);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json("err");
                  });
              }
              else {
                // De lo contrario, entonces se crea la específica
                models.especificas.create({
                  numero_especifica: numero_especifica,
                  denominacion: especifica.denominacion,
                  generica_id: id_partida_generica
                })
                  .then(especifica_creada => {
                    if (especifica_creada) {
                      console.log(`Partida específica ${numero_partida[0]}${numero_partida[1]}.${numero_partida[2]}.${numero_especifica}.00 creada correctamente.`);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json("err");
                  });
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json("err");
            });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json("err");
        });
      
    })
    .catch(err => {
      console.log(err);
      res.json("err").status(500);
    })
  }))
  .then(() => {
    res.status(200).json("ok"); 
  });
}

function cargarPartidasGenericas(genericas, res, next) {
  Promise.all(genericas.map(generica => {
    let numero_partida = generica.numero.split(".");
    let numero_partida_presupuestaria = `${numero_partida[0]}${numero_partida[1]}`;
    let numero_generica = `${numero_partida[2]}`;
    let id_partida_presupuestaria;
    // Primero se busca en la base de datos el id de la partida presupuestaria a la cual
    // está asociada la genérica
    models.partidas_presupuestarias.findOne({ where: { numero_partida: numero_partida_presupuestaria } })
      .then(partida_presupuestaria => {
        id_partida_presupuestaria = partida_presupuestaria.dataValues.id;
        // Se busca en la base de datos si la genérica ya existe
        models.genericas.findOne({ where: { numero_generica: numero_generica, partida_presupuestaria_id: id_partida_presupuestaria } })
          .then(resultado => {
            // Si ya existe, entonces se actualiza con la nueva información
            if (resultado) {
              models.genericas.update({ denominacion: generica.denominacion }, { where: { id: resultado.dataValues.id } })
                .then(generica_actualizada => {
                  if (generica_actualizada[0]) {
                    console.log(`Partida genérica ${numero_partida[0]}${numero_partida[1]}.${numero_generica}.00.00 actualizada correctamente.`);
                  }
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json("err");
                });
            }
            else {
              // De lo contrario, entonces se crea la genérica
              models.genericas.create({
                numero_generica: numero_generica,
                denominacion: generica.denominacion,
                partida_presupuestaria_id: id_partida_presupuestaria
              })
                .then(generica_creada => {
                  if (generica_creada) {
                    console.log(`Partida genérica ${numero_partida[0]}${numero_partida[1]}.${numero_generica}.00.00 creada correctamente.`);
                  }
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json("err");
                });
            }
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json("err");
      });
  }))
  .then(() => {
    res.status(200).json("ok"); 
  });
}

function cargarPartidasPresupuestarias(partidas, res, next) {
  Promise.all(partidas.map(partida => {
    let numero_partida = partida.numero.split(".");
    // Se busca si la partida existe previamente en la base de datos
    models.partidas_presupuestarias.findOne({ where: { numero_partida: `${numero_partida[0]}${numero_partida[1]}` } })
      .then(resultado => {
        // Si existe, se actualiza con la nueva denominación
        if (resultado) {
          models.partidas_presupuestarias.update({ denominacion: partida.denominacion }, { where: { id: resultado.dataValues.id } })
            .then(partida_actualizada => {
              if (partida_actualizada[0]) {
                console.log(`Partida ${numero_partida[0]}${numero_partida[1]} actualizada correctamente.`);
              }
            });
        }
        else {
          // Si no existe, entonces se crea
          models.partidas_presupuestarias.create({
            numero_partida: `${numero_partida[0]}${numero_partida[1]}`,
            denominacion: partida.denominacion
          })
            .then(res2 => {
              if (res2) {
                console.log(`Partida ${numero_partida[0]}${numero_partida[1]} creada correctamente.`);
              }
            })
            .catch(err => {
              console.log(err);
              res.status(500).json("err");
            });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json("err");
      });
  }))
  .then(() => {
    res.status(200).json("ok"); 
  });
}

