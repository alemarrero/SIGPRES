var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcrypt');


/* GET users listing. */
router.post('/registro_usuario', function(req, res, next) {
  bcrypt.hash(req.body.password, 10, function(err, hash){
    models.usuarios.findOne({
      where: {usuario: req.body.usuario}
    })
    .then(x => {
      if(!x){
        models.usuarios.create({
          nombre: req.body.nombre, 
          apellido: req.body.apellido,
          cedula: req.body.cedula,
          fecha_ingreso: new Date(),
          fecha_nacimiento: new Date(),
          departamento: req.body.departamento,
          cargo: req.body.cargo,
          rol: req.body.rol,
          habilitado: req.body.habilitado,
          correo: req.body.correo,
          usuario: req.body.usuario,
          password: hash,
        })
        .then(usuario => {
          console.log(usuario);
          res.status(201).json(usuario);
        })
        .catch(error => {
          console.log(error);
          res.status(500).json(error);    
        })
      }
      else {
        res.status(409).json('usuario ya existe');
      }
    })  
    
  })
});

router.post('/login', function(req, res) {
  models.usuarios.findOne(
    {where: {usuario: req.body.usuario}},
  )
  .then(usuario => {
    // Si encuentra un usuario validado que tenga dicho correo y este validado, procede a validar el inicio de sesión
    if(usuario){
      bcrypt.compare(req.body.password, usuario.dataValues.password, (err, clave_valida) => {
        if(clave_valida){
          
          req.session.autenticado = true;
          req.session.save();
          res.send(req.session);
        }
        else{
          res.status(401).json('password invalida');
        }
      });
    }
    //De lo contrario el usuario o no existe, o no se encuentra validado
    else{
      res.status(404).json('err');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/logout', function(req,res){
  req.session.destroy();
  res.status(200).json('ok');
})

module.exports = router;
