var express     = require('express'),
    path        = require('path'),
    Banners     = require('../../models/base/banner'),
    Products    = require('../../models/store/product'),
    router      = express.Router();

var version     = '0.0.1';
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/docs/index.html'));
})

router.get('/version', (req, res) => {
    msg = {
        status: 'ok',
        data: {
            version: version
        }
    };
    res.status(200).json(msg);
})

router.get('/search/:query', (req, res) => {
    let regex = new RegExp(escapeRegex(req.params.query), 'gi');
    Products.find({$or: [ {name: regex}, {description: regex}]}).lean().exec( (err, results) => {
        if(err) console.log(err)
        let msg = {
            status: 'ok',
            data: {
                results: results
            }
        }
        return res.status(200).json(msg);
    })
})
function escapeRegex(text){
    text = decodeURIComponent(text);
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
module.exports = router;