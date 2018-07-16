var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;
    require('mongoose-double')(mongoose);
var ImagesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    primary: {
        type: Boolean,
        default: false
    }
}, {_id: false});
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
    images: {
        type: [ImagesSchema]
    },
    description: {
        type: String,
        required: true
    },
    inStock: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Product', ProductSchema);