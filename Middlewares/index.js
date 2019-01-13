const User = require('../models/user')
const Project = require('../models/project')
const {verifyToken} = require('../helpers/index')


module.exports = {
    Authentication : function(req, res, next){
        let {id, email} = verifyToken(req.headers.token)
        User.findOne({_id : id}, function(err, data){
            if(err){
                res.status(400).json(err)
            }else{
                if(!data){
                    res.status(401).json(`Authorization Error : User with email ${email} not authorized.`)
                }else{
                    req.userId = id;
                    next()
                }
            }
        })
    },
    MemberAuthorization : function(req, res, next){
        Project.findById(req.params.id, function(err, project){
            if(err){
                res.status(400).json(err)
            }else{
                if(!project){
                    res.status(404).json("Project not found")
                }else{
                    let isUser = project.members.filter(user => {
                        return user == req.userId
                    })
                    if(isUser!== -1) next()
                    else res.status(401).json("You are not the member of this project")
                }
            }
        })
    },
    verifyToken : function(req, res, next){
        var CLIENT_ID = '538354353006-m1asnrg9t3e0vp3j1tk30chuknv12dv7.apps.googleusercontent.com'
        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            let data = {
                email : payload.email,
                picture: payload.picture,
                name: payload.picture,
                first_name: payload.given_name,
                last_name: payload.family_name
            }
            req.data = data
            return User.findOne({
                email : data.email
            })
        })
        .then(user => {
            if(user){
                req.registered = true
                next()
            }else{
                req.registered = false
                next()
            }
        })
        .catch(error => {
            console.log(error)
            res.status(400).json(error)
        }) 
    }
}