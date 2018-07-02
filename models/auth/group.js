var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var PermissionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {_id: false});

var GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    permissions: [PermissionSchema],
    default: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Group', GroupSchema);