var {Strategy: JwtStrategy, ExtractJwt}  = require('passport-jwt'),
    mongoose                = require('mongoose'),
    UserModel               = require('../models/auth/user'),
    GroupModel              = require('../models/auth/group'),
    database                = require('./database'),
    session                 = require('./session');

module.exports = (passport) => {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = session.secret;
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        mongoose.connect(database.uri)
        //Needed to be lean() to be able to modify returned object
        UserModel.findOne({_id: jwtPayload}, '-password').lean().exec( (err, user) => {
            if (err) return done(err, false);
            if(user) {
                GroupModel.findOne({_id: user.role}).lean().exec( (err, group) => {
                    if (err) return done(err, false);
                    if(group){
                        user.group = group.name;
                        user.permissions = group.permissions;
                        done(null, user);
                    } else {
                        done(null, false)
                    }
                })
            } else {
                done(null, false);
            }
        })
    }))
}