var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    city_name : String,
    _state : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'state'
    },
})
module.exports = mongoose.model('city',mySchema);