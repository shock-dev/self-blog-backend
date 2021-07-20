const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

const generateJWT = ({ _id, email }) => {
  return jwt.sign(
    { _id, email },
    secret,
    { expiresIn: '30d' }
  );
};

module.exports = generateJWT;
