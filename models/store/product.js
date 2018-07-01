var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;
    require('mongoose-double')(mongoose);

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Schema.Types.Double,
        required: true,
        default: 0.00
    },
    categories: {
        type: Array
    },
    description: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', ProductSchema);