var multer  = require('multer');

// Se crea configuración para almacenar los archivos en disco
// Se indica que se van a almacenar en una carpeta llamada /temp
// y además que se va a utilizar el nombre original del archivo
var storage = multer.diskStorage(
  {
      destination: 'temp/',
      filename: function ( req, file, cb ) {
          cb( null, file.originalname);
      }
  }
);

// Se le asigna la configuración de almacenamiento a multer, y además
// se le indica que el archivo que se envía del frontend al backend se encuentra
// en campo llamado "fichero" del formulario que recibe (multipart/form-data)
var upload = multer( { storage: storage } ).single('fichero');

let recibirArchivo =  function(req, res, next){
  try {
    // Se procede a almacenar el archivo
    upload(req, res, function(err){
      // Si ocurre algún error, se imprime en consola y se devuelve el estado 500 y 'err' como respuesta
      if(err){
        console.log(err);
        res.status(500).json('err');
      }
      // De lo contrario, se procede a llamar al siguiente middleware
      else{
        next();
      }
    })
  } catch (error) {
    console.log(error);
    res.status(500).json('err');
  }
};

module.exports = recibirArchivo;