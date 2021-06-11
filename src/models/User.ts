import { model, Schema } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  },
  cloudinaryId: {
    type: String
  },
  birthday: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
});

export default model<IUser>('User', userSchema);
