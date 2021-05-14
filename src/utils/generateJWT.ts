import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY || 'test';

const generateJWT = ({ _id, email }: any) => {
  return jwt.sign(
    { _id, email },
    secret,
    { expiresIn: '30d' }
  );
};

export default generateJWT;
