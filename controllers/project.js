const Project = require('../models/project');
const User = require('../models/user')
const {verifyToken} = require('../helpers/index')

module.exports = {
    create: function(req,res,next){
        const id = req.userId;
        Project.create({
            name: req.body.name,
            members: req.userId,
        }, function(err,project){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({
                    msg : "Project Created",
                    project
                })
            }
        })
    },
    findAll: function(req, res, next){
        Project.find({}, function(err, projects){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(projects)
            }
        })
    },
    findOne:function(req, res, next){
        const userId = req.userId;
        Project.findOne({_id : req.params.id}, function(err, project){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(project)
            }
        })
    },
    update : function(req, res, next){
        let id = req.headers.task_id;
        let input = {title, description, due_date, status} = req.body
        for(let key in input) {
            if(key == undefined)
            delete input[key]
        }
        Project.findOneAndUpdate({_id : id}, {$set: input}, {new : true}, function(err, result){
            if(err){
                res.status(400).json(err)
            }else{
                console.log("Updated the project");
                res.status(200).json({
                    data: result
                })
            }
        })
    },

    delete : function(req, res, next){
        Project.findOneAndDelete({_id: req.params.id}, function(err, result){
            if(err){
                res.status(400).json(err)
            }else{
                console.log("removed the project");
                res.status(200).json("removed project")
            }
        })  
    },
    invite : function(req, res){
        User.findOne({email : req.params.email}, function(err, user){
            if(err){
                res.status(400).json(err)
            }else{
                if(!user){
                    res.status(404).json("User not registered")
                }else{
                    Project.findOneAndUpdate({_id : req.params.id, members : {$nin : user.email, $comment: "Don't allow negative inputs."}}, {$push : { members : user.id}}, {new : true}, function(err, member){
                        if(err){
                            res.status(400).json("User already join the project")
                        }else{
                            res.status(200).json(member)
                        }
                    })
                }
            }
        })
        
    }
}