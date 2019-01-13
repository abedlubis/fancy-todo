const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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

const Project = mongoose.model('Project', projectSchema)

module.exports = Project