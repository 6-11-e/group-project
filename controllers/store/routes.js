var express     = require('express'),
    router      = express.Router();

router.get('/', (req, res) => {
    let msg = {
        status: 'ok',
        data: {
            message: 'Store Controller is available!'
        }
    }
})

//Add all /store/* routes to controllers/index.js
module.exports = router;