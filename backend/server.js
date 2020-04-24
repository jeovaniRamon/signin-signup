'use strict'
const express = require('express');
const authRoutes = require('./auth/auth.routes');
const properties = require('./config/properties');
const app = express();
const DB = require('./config/db')
const router = express.Router();
DB();
app.use('/api', router);
authRoutes(router);
router.get('/',(req, res) => {
    res.send('hola desde home');
});

app.listen(properties.PORT, () => console.log(`Server runing on port ${properties.PORT}`));