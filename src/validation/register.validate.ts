import { body } from 'express-validator';

const email = { min: 6, max: 70 };
const username = { min: 2, max: 50 };
const password = { min: 6, max: 50 };

export default [
  body('email', 'Enter the email')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Enter email correctly')
    .isLength(email)
    .withMessage(`Allowed number of characters in email from ${email. min} to ${email. max}`),
  body('username', 'Enter the username')
    .isString()
    .withMessage('Username must be a string')
    .isLength(username)
    .withMessage(`Allowed number of characters in username from ${username. min} to ${username. max}`),
  body('password', 'Введите пароль')
    .isString()
    .isLength(password)
    .withMessage(`Allowed number of characters in username from ${password. min}`),
  body('passwordConfirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }

      return true;
    })
];
