var express     = require('express'),
    User        = require('../../models/auth/user'),
    passport    = require('passport'),
    config      = require('../../conf/config'),
    jwt         = require('jsonwebtoken'),
    mongoose    = require('mongoose'),
    router      = express.Router();
                  require('../../conf/passport')(passport);
console.log(config.db.uri);
mongoose.connect(config.db.uri);

router.get('/', (req, res) => {
    let msg = {
        status: 'ok',
        data: {
            message: 'Auth Controller is available!'
        }
    }
})

router.post('/register', (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({status: 'error', message: 'Please enter email and password'});
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        newUser.save( (err) => {
            if (err) return res.json({status: 'error', message: 'Username already exists ' + err});
            res.json({status: 'ok', message: 'Successfully created new user'});
        });
    }
})

router.post('/login', (req, res) => {
    console.log(req)
    console.log('Attempted login for ' + req.body.email);
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) throw err;

        if(!user) {
            console.log('No user found')
            res.status(401).send({status: 'error', message: 'Auth failed. User not found'});
        } else {
            console.log('Found User ' + user.email + '. Validating pass')
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(user.toObject(), config.session.secret);
                    console.log(`${user.email} successfully logged in.`)
                    res.json({status: 'ok', data: {token: token}});
                } else {
                    console.log('Wrong pass')
                    res.status(401).send({status: 'error', message: 'Auth failed. Wrong password'});
                }
            })
        }
    })
})
//Add all /auth/* routes to controllers/index.js
module.exports = router;