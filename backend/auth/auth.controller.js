const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretKey123456';

exports.createUser = (req, res, next) =>{
    const newUser = {
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
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
    exports.loginUser = (req, res, next) => {
        const userData ={
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({email:userData.email},(err,user)=>{
            if(err) return res.status(500).send('server error');
            if (!user){
                //no existe el email
                res.status(409).send({message: 'algo está mal'});
            }else{
                const resultPassword = userData.password;
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

