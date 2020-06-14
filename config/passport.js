const keys = require('./keys')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const Users = require('../model/User')

const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
}

module.exports = passport => {
    passport.use(
        new jwtStrategy(opts, (payload, done) => {
            Users.findById(payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
                .catch((err) => console.log(err))
        })
    )
}