import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import consola from 'consola';
import cookieParser from 'cookie-parser';
import connect from './core/db';

dotenv.config();

import postsRoutes from './routes/posts';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(passport.initialize());

app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

connect()
  .then(() => {
    app.listen(port, () => {
      consola.success(`Server has been started at ${port} port`);
    });
  });
