import { Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string
  email: string
  username: string
  password: string
}
