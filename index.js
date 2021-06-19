const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const consola = require('consola');
const cookieParser = require('cookie-parser');
const connect = require('./src/core/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
  credentials: true,
  origin: 'https://self-blog.vercel.app',
  optionsSuccessStatus: 200
}));

app.use('/api/posts', require('./src/routes/posts'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));

connect()
  .then(() => {
    app.listen(port, () => {
      consola.success(`Server has been started at ${port} port`);
    });
  });
