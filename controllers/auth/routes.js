var express     = require('express'),
    User        = require('../../models/auth/user'),
    GroupModel  = require('../../models/auth/group'),
    passport    = require('passport'),
    config      = require('../../conf/config'),
    jwt         = require('jsonwebtoken'),
    stripe      = require('stripe')(config.payments.processors.stripe.secret)
    router      = express.Router();
                  require('../../conf/passport')(passport);

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
        var newUser = {
            customerID: '',
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
        stripe.customers.create({
            metadata: {firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email}
        }, (err, customer) => {
            if(err) console.log(err)
            newUser.customerID = customer.id;
            GroupModel.findOne({default: true}, (err, group) => {
                if (err) console.log(err);
                newUser.role = group.id;

                newUser = new User(newUser);

                newUser.save( (err) => {
                    if (err) return res.json({status: 'error', message: 'Username already exists ' + err});
                    res.status(200).json({status: 'ok', message: 'Successfully created new user'});
                });
            })
        })

          
    }
});

router.post('/login', (req, res) => {
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
                    let userID = user._id;
                    //Create JWT using user signed with secret.
                    var token = jwt.sign(user.id, config.session.secret);
                    console.log(`Password confirmed. ${user.email} successfully logged in.`)
                    res.json({status: 'ok', data: {token: 'JWT '+token, user: user}});
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