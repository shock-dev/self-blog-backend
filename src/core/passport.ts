import passport from 'passport';
import User from '../models/User';
import jwtStrategy from '../strategies/jwt';

passport.use('jwt', jwtStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: null | Error, user: false | Express.User) => {
    done(err, user);
  });
});

export default passport;
