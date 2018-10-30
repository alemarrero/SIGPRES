/**
 * Método que dado un preset en particular, devuelve el nombre de la carpeta en Cloudinary a la que se debe subir el archivo.
 * 
 * @param {String} preset indica el preset dentro de Cloudinary. Se utiliza para indicar a cual carpeta se subirá el archivo.
 * 
 * @return {String} nombre de la carpeta en Cloudinary.
 */
let obtenerNombreCarpeta = function(preset){
  switch (preset) {
    case 'planes_nacion':
      return "Planes de la nacion";
    
    case 'planes_cgr':
      return "Planes operativos de la CGR";
  
    case 'planes_cmb':
      return "Planes operativos de la CMB";

    case 'presupuesto_participativo':
      return "Presupuesto Participativo";

    default:
      return "Planes operativos de la alcaldia"
  }
}

module.exports = obtenerNombreCarpeta;