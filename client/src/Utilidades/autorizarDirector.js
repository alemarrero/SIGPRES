let autorizarDirectorPP =  function(rol){
    if(rol === "director" || rol === "administrador" || rol === "director rh" || rol === "director pp"){
    	return true;
    }
    else{
    	return false;
    }
};

module.exports = autorizarDirectorPP;