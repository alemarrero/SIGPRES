let autorizarDirectorPP =  function(rol){
    if(rol === "director"){
    	return true;
    }
    else{
    	return false;
    }
};

module.exports = autorizarDirectorPP;