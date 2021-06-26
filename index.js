const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const consola = require('consola');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = process.env.PORT;

if (!port || typeof +port !== 'number') {
  throw new Error('Для запуска необходим порт');
}

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
  credentials: true,
  origin: 'https://self-blog.vercel.app',
  optionsSuccessStatus: 200
}));

app.use('/posts', require('./src/routes/posts'));
app.use('/auth', require('./src/routes/auth'));
app.use('/users', require('./src/routes/users'));

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    consola.success('Database connected');
    app.listen(port, () => {
      consola.success(`Server started on http://localhost:${port}`);
    });
  } catch (error) {
    consola.error(error);
  }
};

start();