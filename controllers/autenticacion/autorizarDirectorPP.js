let autorizarDirectorPP =  function(req, res, next){
    if(!req.session.autenticado){
        res.status(401).json('err');    
    }
    else if(req.session.rol !== 'administrador' && req.session.rol !== 'director pp'){
        res.status(403).json('err');
    }
    else{
        next();
    }
};

module.exports = autorizarDirectorPP;