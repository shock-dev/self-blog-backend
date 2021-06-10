import { Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string
  email: string
  username: string
  fullname: string
  birthday: string
  password: string
  avatarUrl?: string
  cloudinaryId?: string
  posts: string[]
}
