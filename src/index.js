const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const consola = require('consola');
const cookieParser = require('cookie-parser');
const connect = require('./core/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use('/posts', require('./routes/posts'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));

connect()
  .then(() => {
    app.listen(port, () => {
      consola.success(`Server has been started at ${port} port`);
    });
  });
