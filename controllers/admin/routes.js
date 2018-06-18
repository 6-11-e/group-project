var express     = require('express'),
    router      = express.Router();

router.get('/', (req, res) => {
    let msg = {
        status: 'ok',
        data: {
            message: 'Admin Controller is available!'
        }
    }
})

//Add all /admin/* routes to controllers/index.js
module.exports = router;