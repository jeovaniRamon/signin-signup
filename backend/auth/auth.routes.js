const Users = require('./auth.controller');
module.exports = (router) =>{
    router.post('/registrar',Users.crearUsuario);
    router.post('/ingresar',Users.loginUsuario); 
    }
