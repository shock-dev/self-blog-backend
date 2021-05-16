import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import consola from 'consola';
import connect from './core/db';

import postsRoutes from './routes/posts';
import authRoutes from './routes/auth';
import usersRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

connect()
  .then(() => {
    app.listen(port, () => {
      consola.success(`Server has been started at ${port} port`);
    });
  });
