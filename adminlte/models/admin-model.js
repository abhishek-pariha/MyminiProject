var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    admin_email : String,
    admin_password : String,
    admin_photo : String
})
 
module.exports = mongoose.model('admin',mySchema);