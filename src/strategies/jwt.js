const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

const jwtStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}, async ({ _id }, done) => {
  try {
    const user = await User.findById(_id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

module.exports = jwtStrategy;
