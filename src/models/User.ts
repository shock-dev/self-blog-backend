import { model, Schema } from 'mongoose';
import { IUser } from '../types/user';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false }
});

export default model<IUser>('User', userSchema);
