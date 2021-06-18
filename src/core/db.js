const mongoose = require('mongoose');
const consola = require('consola');

const connect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || 'mongodb://localhost:27017/self-blog',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
    consola.success('The Database is ready to work');
  } catch (e) {
    consola.error(e);
    process.exit();
  }
};

module.exports = connect;
