const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () =>{
    mongoose.connect(dbURL,{useNewUrlParser: true})
    .then(() => console.log(`mongo conectado en ${dbURL}`))
    .catch( err => console.log(`Error en la conexión ${err}`))

    process.on('SIGNIN',() =>{
        mongoose.connection.close(() => {
            console.log(`Mongo está desconectado`);
            process.exit(0);
        });
    });
}