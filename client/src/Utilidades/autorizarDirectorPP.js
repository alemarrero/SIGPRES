let autorizarDirectorPP =  function(rol){
    if(rol === "administrador" || rol === "director pp"){
    	return true;
    }
    else{
    	return false;
    }
};

module.exports = autorizarDirectorPP;