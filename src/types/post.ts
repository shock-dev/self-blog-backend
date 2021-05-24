import { Document } from 'mongoose';

export interface IPost extends Document {
  title: string
  description: string,
  user: String
  imageUrl?: String
  views?: number
  cloudinaryId?: string
}
