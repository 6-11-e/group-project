var express     = require('express'),
//    cors        = require('cors'), //Will be needed for xhr later. Likely used individually by controllers below.
    router      = express.Router();
    
//This file adds all of the individual controllers and routes.

//Admin
router.use('/admin', require('./admin/routes'));

//Auth
router.use('/auth', require('./auth/routes'));

//Store
router.use('/store', require('./store/routes'));

//Base
router.use(require('./base/routes'));


//Return all routes from all controllers to server.js
module.exports = router;