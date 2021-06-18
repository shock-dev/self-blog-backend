const { Strategy } = require('passport-jwt');
const User = require('../models/User');

const secret = process.env.SECRET_KEY || 'test';

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies['authToken'];
  }
  return null;
};

const jwtStrategy = new Strategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: secret
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
