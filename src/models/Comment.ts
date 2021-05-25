import { model, Schema } from 'mongoose';
import { IComment } from '../types/comment';

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default model<IComment>('Comment', commentSchema);
