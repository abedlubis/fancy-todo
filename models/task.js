const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type : Date,
        validate : {
            validator : function(date){
                console.log(Date.now())
                return Date.now() < date
            }, 
            message : 'Due date must be greater than today '
        }
    },
    status: {
        type: String,
        default: 'on progress'
    },
    user: { type: Schema.Types.ObjectId, ref: 'User'}
})
taskSchema.post('save', function(doc){
    console.log(doc._id,"==========")
    User.findByIdAndUpdate(doc.user, { '$push': { 'tasks': doc._id }}, function(err){
        if(err) throw new Error(err.message)
    })
    doc.save()
})
taskSchema.post('findOneAndDelete', function(doc){
    User.findByIdAndUpdate(doc.user, { '$pull': { 'tasks': doc._id }}, function(err){
        if(err) throw new Error(err.message)
    })
    doc.save()
})

var Task = mongoose.model('Task', taskSchema)

module.exports = Task