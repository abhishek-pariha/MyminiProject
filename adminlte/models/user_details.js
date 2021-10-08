var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    user_name: String,
    user_mobile: String,
    user_email: String,
    user_password: String,
    user_dob: String,    
    user_gender: String,
    user_isadmin : Boolean,
    user_joinDate : {type: Date, default: Date.now}

});

module.exports = mongoose.model('users', mySchema);