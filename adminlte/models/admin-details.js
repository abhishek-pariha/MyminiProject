var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    admin_name : String,
    admin_email : String,
    admin_password : String,
    admin_joinDate : {type : Date, default : Date.now}
})
module.exports = mongoose.model('admin',mySchema);