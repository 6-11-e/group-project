var express     = require('express'),
    router      = express.Router();

router.get('/', (req, res) => {
    let msg = {
        status: 'ok',
        data: {
            message: 'Auth Controller is available!'
        }
    }
})

//Add all /auth/* routes to controllers/index.js
module.exports = router;