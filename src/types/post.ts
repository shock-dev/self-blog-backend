import { Document } from 'mongoose';

export interface IPost extends Document {
  title: string
  description: string,
  imageUrl?: String
  views?: number
}
