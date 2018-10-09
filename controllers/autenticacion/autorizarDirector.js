let autorizarDirector =  function(req, res, next){
    if(!req.session.autenticado){
        res.status(401).json('err');    
    }
    else if(req.session.rol !== 'administrador' && req.session.rol !== 'director'){
        res.status(403).json('err');
    }
    else{
        next();
    }
};

module.exports = autorizarDirector;