import { model, Schema } from 'mongoose';
import { IPost } from '../types/post';

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

export default model<IPost>('Post', postSchema);
