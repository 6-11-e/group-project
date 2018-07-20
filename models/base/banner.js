var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var BannerSchema = new Schema({
    bannerType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tagLine: {
        type: String
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('Banner', BannerSchema)