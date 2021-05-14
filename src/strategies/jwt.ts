import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';

const secret = process.env.SECRET_KEY || 'test';

const jwtStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}, async ({ _id }, done) => {
  try {
    const user = await User.findById(_id);

    console.log(user);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

export default jwtStrategy;
