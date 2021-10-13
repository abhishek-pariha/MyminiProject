var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    user_name: String,
    user_email: String,
    user_password: String,
    user_address: String,    
    user_gender: String, 
    user_photo : String,
    _area :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'area' 
    },
    user_joinDate : {type: Date, default: Date.now}

});

module.exports = mongoose.model('users', mySchema); 