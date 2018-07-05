var express     = require('express'),
    passport    = require('passport'),
    roleCheck   = require('../helpers/auth/roles'),
    router      = express.Router();
 
let protectRoute = passport.authenticate('jwt', {session: false});
//This file adds all of the individual controllers and routes.

//Admin
router.use('/admin', protectRoute, roleCheck('Admin'), require('./admin/routes'));

//Auth
router.use('/auth', require('./auth/routes'));

//Store
router.use('/store', require('./store/routes'));

//Base
router.use(require('./base/routes'));


//Return all routes from all controllers to server.js
module.exports = router;