var cloudinary = require('cloudinary').v2;
const obtenerNombreCarpeta = require('./obtenerCarpeta');

/**
 * Controlador que se encarga de subir el archivo que acaba de subir el usuario a cloudinary y se encuentra
 * almacenado en la carpeta /temp.
 * 
 * @param {String} preset Representa el preset a ser utilizado dentro de cloudinary; este valor puede ser:
 * uno de los siguientes: 'planes_nacion', 'planes_cgr', 'planes_cmb' o 'planes_alcaldia'.
 * 
 * @return almacena en req.file_url la URL que devolvió cloudinary y en req.public_id el Public ID que 
 * devolvio cloudinary, y llama a next() para ejecutar el siguiente middleware.
 */
let subirArchivo =  function(preset){
  return function(req, res, next){
    cloudinary.uploader.upload(
      req.file.path, 
      {
        resource_type: "raw",
        use_filename: true,
        folder: obtenerNombreCarpeta(preset)
      },
      function(error, result) {
        if(error){
          console.log(error);
          res.status(500).json('err');
        }
        else{
          console.log(result);
          req.file_url = result.url;
          req.public_id = result.public_id;
          next();
        }
      });
  }
};

module.exports = subirArchivo;