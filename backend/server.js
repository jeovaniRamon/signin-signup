

'use strict'
const express = require('express');
const app = express();
const Usuario = require('./auth/auth.controller');
const DB = require('./config/db');
DB();
app.get('/',(req, res) => {
    res.send('hola desde home');
});
app.post('/registrar', Usuario.crearUsuario);
app.post('/ingresar', Usuario.loginUsuario);


app.listen(4000, () => console.log(`servidor corriendo en el puerto 4000`));
