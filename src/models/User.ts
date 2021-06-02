import { model, Schema } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  avatarUrl: {
    type: String
  },
  cloudinaryId: {
    type: String
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  timestamps: true
});

export default model<IUser>('User', userSchema);
