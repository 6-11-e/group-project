var {Strategy: JwtStrategy, ExtractJwt}  = require('passport-jwt'),
    UserModel               = require('../models/auth/user'),
    database                = require('./database'),
    session                 = require('./session');

module.exports = (passport) => {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = session.secret;
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        UserModel.findOne({id: jwtPayload.id}, (err, user) => {
            if (err) return done(err, false);
            if(user) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
    }))
}