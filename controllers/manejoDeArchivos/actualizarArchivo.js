var cloudinary = require('cloudinary').v2;

/**
 * Controlador que se encarga de eliminar el archivo que se encontraba previamente en Cloudinary y lo actualiza
 * con un nuevo archivo proporcionado por el usuario.
 * 
 * @param {String} preset Representa el preset a ser utilizado dentro de cloudinary; este valor puede ser:
 * uno de los siguientes: 'planes_nacion', 'planes_cgr', 'planes_cmb' o 'planes_alcaldia'. 
 * 
 * @return almacena en req.file_url la URL que devolvió cloudinary y en req.public_id el Public ID que 
 * devolvio cloudinary, y llama a next() para ejecutar el siguiente middleware.
 */
let actualizarArchivo =  function(preset){
  return function(req, res, next){
    // Primero se procede a eliminar el archivo anterior almacenado en Cloudinary haciendo uso de su Public ID
    cloudinary.uploader.destroy(`${req.body.fichero_anterior}`, function(error, result){
      if(error){
        console.log(error);
        res.status(500).json('err');
      }
      else{
        // Una vez que se haya eliminado el archivo anterior, se procede a subir el nuevo archivo    
        cloudinary.uploader.unsigned_upload(
          req.file.path, 
          preset, 
          function(error, result) {
            if(error){
              console.log(error);
              res.status(500).json('err');
            }
            else{
              // Una vez que se haya subido el archivo, se almacena en req.file_url y en req.public_id 
              // la información del url y el nuevo public id que cloudinary devolvió.
              req.file_url = result.url;
              req.public_id = result.public_id;
              next();
            }
          });
      }
    });
  }
};

module.exports = actualizarArchivo;