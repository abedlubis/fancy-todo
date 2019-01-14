const User = require('../models/user')
const {encrypt, compare, sign} = require('../helpers')
const jwt = require('jsonwebtoken')
const axios = require('axios')

module.exports = {
    login: function(req, res, next){
        User.findOne({
            email : req.body.email
        }, function(err, user){
            if(err){
                res.status(400).json(err.message)
            }else{
                if(user){
                    if(compare(req.body.password, user.password)){
                        var token = sign({
                            id: user._id, 
                            email: user.email
                        });
                        res.status(200).json({
                            msg : "user login", 
                            token: token
                        })
                    }else{
                        res.status(400).json("wrong password")
                    }
                }else{
                    res.status(400).json({
                        message: "User not found"
                    })
                }
            }
        }) 
    },
    register: function(req, res, next){
        let input = {
            email : req.body.email,
            password: encrypt(req.body.password),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            gender: req.body.gender,
            birthdate: req.body.birthdate
        }
        for(let key in input) {
            if(input[key] == undefined) delete input[key]
        }
        User.create(input, function(err,users){
            if(err){
                res.status(400).json({error : err,
                    message : err.message
                })
            }else{
                res.status(200).json({
                    msg : "Succesfull!! User registered",
                    data: users
                })
            }
        })
    },
    loginGoogle: function(req, res, next){
        if(req.registered){
            var token = sign({
                email: req.data.email
            });
            res.status(200).json({
                msg : "user login", 
                token: token,
                name: req.data.name,
                profile_pict: req.data.picture
            })
        }else{
            User.create({
                email : req.data.email,
                firstName: req.data.first_name,
                lastName: req.data.last_name,
                provider: "google"
            })
            .then(userNew => {
                var token = sign({
                    email: userNew.email
                });
                res.status(200).json({
                    msg : "User Created",
                    token: token,
                    name: req.data.name,
                    profile_pict: req.data.picture  
                })
            })
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
        }
    }
}