import { Document } from 'mongoose';

export interface IComment {
  text: string
  post: string
  user: String
}

export interface ICommentDocument extends IComment, Document {}
