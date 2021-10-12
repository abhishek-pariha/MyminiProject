var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mySchema = new Schema({
    area_name : String,
    _city : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'city'
    },
    _state : 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'state'
        }
    })

module.exports = mongoose.model('area',mySchema);