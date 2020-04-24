const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretKey123456';

exports.crearUsuario = (req, res, next) =>{
    const newUser = {
        nombre: req.body.name,
        email:req.body.name,
        contraseña: req.body.password
    }
    User.create(newUser,(err,user)=>{
        if (err) return res.status(500).send('server error');
        const expiresIn= 24*60*60;
        const accessToken = jwt.sign({id: user.id},
            SECRET_KEY,{
                expiresIn: expiresIn
            });
            //response
        res.send({user});
    });
}
    exports.loginUsuario = (req, res, next) => {
        const userData ={
            email: req.body.email,
            contraseña: req.body.password
        }
        User.encontrar({email:userData.email},(err,user)=>{
            if(err) return res.status(500).send('server error');
            if (!user){
                //no existe el email
                res.status(409).send({message: 'algo está mal'});
            }else{
                const resultPassword = userData.contraseña;
                if(resultPassword){
                    const expiresIn = 24* 60* 60;
                    const accessToken = jwt.sign({id:user.id},SECRET_KEY, {expiresIn:expiresIn});
                    res.send({userData});
                } else {
                    //password incorrecta
                    res.status(409).send({message: 'algo está mal'});
                }
            }
        });
    }

