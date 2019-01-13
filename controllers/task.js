const Task = require('../models/task');
const {verifyToken} = require('../helpers/index')

module.exports = {
    create: function(req,res,next){
        Task.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            user: req.userId
        }, function(err,task){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json({
                    msg : "Task Created",
                    task
                })
            }
        })
    },
    findAll: function(req, res, next){
        Task.find({}, function(err, tasks){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(tasks)
            }
        })
    },
    findOne:function(req, res, next){
        const userId = req.userId;
        Task.findOne({_id : req.params.id}, function(err, task){
            if(err){
                res.status(400).json(err)
            }else{
                res.status(200).json(task)
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
        Task.findOneAndUpdate({_id : id}, {$set: input}, function(err, result){
            console.log("Updated the task");
            res.status(200).json({
                data: result
            })
        })
    },

    delete : function(req, res, next){
        Task.findOneAndDelete({title: req.body.title}, function(err, result){
            if(err){
                res.status(400).json({error : err})
            }else{
                console.log(result)
                console.log("removed the task");
                res.status(200).json("removed task")
            }
        })  
    }
}