let autorizarUsuario =  function(req, res, next){
    if(!req.session.autenticado){
        res.status(401).json('err');    
    }
    else if(req.session.autenticado && (req.session.rol !== 'administrador' || req.session.rol !== 'director' || req.session.rol !== 'regular')){
        res.status(403).json('err');
    }
    else{
        next();
    }
};

module.exports = autorizarUsuario;