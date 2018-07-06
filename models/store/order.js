var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;
    require('mongoose-double')(mongoose);

var AddressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    line2: {
        type: String,
        default: null
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: 'usa'
    }
}, {_id: false});
var ShippingSchema = new Schema({
    carrier: {
        type: String,
        default: ''
    },
    tracking: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: AddressSchema,
        required: true
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
var OrderSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    subtotal: {
        type: Schema.Types.Double,
        required: true,
        default: 0.00
    },
    tax: {
        type: Schema.Types.Double,
        required: true,
        default: 0.00
    },
    shippingCost: {
        type: Schema.Types.Double,
        required: true,
        default: 0.00
    },
    status: {
        type: String,
        default: 'pending',
        required: true
    },
    shipping: {
        type: ShippingSchema,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated: {
        type: Date,
        default: null,
    },
    history: {
        type: [{
            _id: false,
            date: {
                type: Date,
                default: Date.now
            },
            description: {
                type: String,
            }
        }]
    },
    amountReturned: {
        type: Schema.Types.Double,
        default: 0.00
    },
    items: {
        type: [ProductSchema]
    },
    transactionID: {
        type: String,
        required: true
    },
    sourceID: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', OrderSchema);