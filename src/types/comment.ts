import { Document } from 'mongoose';

export interface IComment {
  text: string
  post: string
  user: string
}

export interface ICommentDocument extends IComment, Document {}
