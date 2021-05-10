import express from 'express';
import consola from 'consola';

const app = express();
const port = 3000;

app.listen(port, () => {
  consola.success(`Server has been started at ${port} port`);
});
