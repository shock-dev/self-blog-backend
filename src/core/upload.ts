import multer from 'multer';
import path from 'path';
import { Request } from 'express';

export default multer({
  storage: multer.diskStorage({}),

  fileFilter(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    const ext = path.extname(file.originalname);

    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('File type is not supported'));
    }

    cb(null, true);
  }
});
