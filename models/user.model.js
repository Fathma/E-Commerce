var mongoose = require('mongoose');
var Schema = mongooose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema =new Schema({
    email: {type:String, required: true},
    password: {type:String, required: true}
       
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
serSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password); 
}

module.exports = mongooose.model('User', userSchema);