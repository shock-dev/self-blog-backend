import { Strategy } from 'passport-jwt';
import User from '../models/User';
import { Request } from 'express';

const secret = process.env.SECRET_KEY || 'test';

const cookieExtractor = (req: Request) => {
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

export default jwtStrategy;
