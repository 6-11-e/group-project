var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    showFP: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Category', CategorySchema);