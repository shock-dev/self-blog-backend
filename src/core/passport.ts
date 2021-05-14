import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { IUser } from '../types/user';

passport.use(new LocalStrategy.Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user: IUser | null = await User.findOne({ email }).select('+password');

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
));

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
