var express     = require('express'),
    path        = require('path'),
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

module.exports = router;