import { model, Schema } from 'mongoose';
import { IPost } from '../types/post';

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default model<IPost>('Post', postSchema);
