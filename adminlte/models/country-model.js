var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mySchema = new Schema({
    country_name : String
})

module.exports = mongoose.model('country',mySchema);