import passport from 'passport';
import User from '../models/User';
import { IUser } from '../types/user';
import jwtStrategy from '../strategies/jwt';

passport.use('jwt', jwtStrategy);

type User = {
  _id?: number
}

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: Error, user: IUser | null) => {
    done(err, user);
  });
});

export default passport;
