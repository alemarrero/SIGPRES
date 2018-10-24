var cloudinary = require('cloudinary').v2;

/**
 * Controlador que se encarga de subir el archivo que acaba de subir el usuario a cloudinary y se encuentra
 * almacenado en la carpeta /temp.
 * 
 * @param {String} fichero Representa el Public ID, el cual es único, asignado por Cloudinary a un archivo 
 * en específico.
 * 
 * @return almacena en req.archivo_borrado un booleando que indica si el archivo fue eliminado correctamente 
 * (true) o si no se pudo eliminar (false). Finalmente, llama a next() para ejecutar el siguiente middleware.
 */
let eliminarArchivo =  function(req, res, next){
  cloudinary.uploader.destroy(req.body.fichero, {resource_type: "raw"}, function(error, result){
    if(error){
      console.log(error);
      req.archivo_borrado = false;
      // res.status(500).json('err');
    }
    else{
      req.archivo_borrado = true;
      next();
    }
  });
};

module.exports = eliminarArchivo;