var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mySchema = new Schema({
    product_name : String,
    product_detail: String,
    product_price : String,
    product_photo : String,
    _category:
        {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'category'
        }
})

module.exports = mongoose.model('product',mySchema);