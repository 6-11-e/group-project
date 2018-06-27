var express     = require('express'),
    User        = require('../../models/auth/user'),
    passport    = require('passport'),
    config      = require('../../conf/config'),
    jwt         = require('jsonwebtoken'),
    mongoose    = require('mongoose'),
    getToken    = require('../../helpers/sessions'),
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
        console.log(req.body)
        res.json({status: 'error', message: 'Please enter email and password'});
    } else {
        console.log(req.body)
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        newUser.save( (err) => {
            if (err) return res.json({status: 'error', message: 'Username already exists ' + err});
            res.status(200).json({status: 'ok', message: 'Successfully created new user'});
        });
    }
});

router.post('/login', (req, res) => {
    console.log(req.body)
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
                    //Delete user.password since we're passing back user
                    user.password = undefined;
                    //Create JWT using user signed with secret.
                    var token = jwt.sign(user.toObject(), config.session.secret);
                   
                    console.log(`${user.email} successfully logged in.`)
                    res.json({status: 'ok', data: {token: 'JWT '+token, user: user}});
                } else {
                    console.log('Wrong pass')
                    res.status(401).send({status: 'error', message: 'Auth failed. Wrong password'});
                }
            })
        }
    })
})

router.post('/testAuth', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(getToken(req.headers)) {
        console.log('Auth route successful');
        msg = {
            status: 'ok',
            message: 'Successful Auth'
        }
        res.status(200).json(msg)
    } else {
        console.log('Unable to auth')
        msg = {
            status: 'error',
            message: 'Unable to auth'
        };
        res.status(401).json(msg)
    }
})
//Add all /auth/* routes to controllers/index.js
module.exports = router;