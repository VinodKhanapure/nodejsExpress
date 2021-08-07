var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema


var userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.plugin(uniqueValidator)

var User = mongoose.model('user',userSchema)
module.exports = User