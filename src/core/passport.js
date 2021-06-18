const passport = require('passport');
const User = require('../models/User');
const jwtStrategy = require('../strategies/jwt');

passport.use('jwt', jwtStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
