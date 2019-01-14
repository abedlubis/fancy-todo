const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('../models/user')

var projectSchema =  new Schema({
    tasks : [{
        type : Schema.Types.ObjectId,
        ref : 'Task'
    }],
    members : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    name : {
        type: String
    },
    createdAt : {
        type : Date,
        default: Date.now
    }
    
})

projectSchema.post('save', function(doc){
    User.findByIdAndUpdate(doc.members, { '$push': { 'projects': doc._id }}, function(err){
        if(err) throw new Error(err.message)
    })
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project