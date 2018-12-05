let autorizarAdministrador =  function(rol){
    if(rol === "administrador"){
    	return true;
    }
    else{
    	return false;
    }
};

module.exports = autorizarAdministrador;