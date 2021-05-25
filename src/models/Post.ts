import { model, Schema } from 'mongoose';
import { IPost } from '../types/post';

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  views: {
    type: Number,
    default: 0,
    required: true
  },
  cloudinaryId: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default model<IPost>('Post', postSchema);
