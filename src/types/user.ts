import { Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string
  email: string
  username: string
  name: string
  surname: string
  gender: 'male' | 'female'
  birthday: string
  password: string
  avatarUrl?: string
  bio?: string
  location?: string
  cloudinaryId?: string
  followers: string[]
  following: string[]
  posts: string[]
}
