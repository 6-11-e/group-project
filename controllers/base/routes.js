var express     = require('express'),
//    cors        = require('cors'), //Will likely be needed in future.
    router      = express.Router();

//Testing version number. Will be fetched from db.
var version     = '0.0.1';

// GET /api/version => Version of API in use.
router.get('/version', (req, res) => {
    //Will replace with logger helper added to service.js
    console.log('GET /version');

    //Build response object
    msg = {
        status: 'ok',
        data: {
            version: version
        }
    };

    //Set response type and send with status.
    res.type('json');
    res.status(200).json(msg);
})

//Add all /:x routes to controllers/index.js
module.exports = router;