import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import consola from 'consola';

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  consola.success(`Server has been started at ${port} port`);
});
