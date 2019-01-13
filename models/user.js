var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var userSchema = new Schema({
    email: {
        type: String,
        required: 'Email is required',
        validate : {
            isAsync : true,
            validator : function(email){
                return User.findOne({email})
                .then(user => {
                    if(user){
                        throw('Email already exist')
                    }
                })
                .catch(err => {
                    throw err
                })
            },
            match : [/\S+@\S+\.\S+/, 'email is invalid'],
        }
    },
    password: String,
    phone: {
        type: String,
        minlength: [11, 'phone number minimal 11 digits'],
        maxlength: [14, 'phone numbers maximal 14 digits']
    },
    firstName: String,
    lastName: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Todo'}],
    provider: {
        type: String,
        default: 'manual'
    }

});

var User = mongoose.model('User', userSchema)

 module.exports = User