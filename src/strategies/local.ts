import LocalStrategy from 'passport-local';
import { IUser } from '../types/user';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const local = new LocalStrategy.Strategy(
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
);

export default local;
