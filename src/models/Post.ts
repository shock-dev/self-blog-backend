import { Document, model, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string
  description: string
}

const userSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

export default model<IPost>('Post', userSchema);
