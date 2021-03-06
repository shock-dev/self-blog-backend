const { body } = require('express-validator');

const email = { min: 6, max: 70 };
const username = { min: 2, max: 50 };

module.exports = [
  body('email', 'Введите email')
    .isString()
    .withMessage('Email должен быть строкой')
    .isEmail()
    .withMessage('Некорректно введет email')
    .isLength(email)
    .withMessage(`Допустимое кол-во символов email от ${email. min} до ${email. max} символов`),

  body('username', 'Введите username')
    .isString()
    .withMessage('Username должен быть строкой')
    .isLength(username)
    .withMessage(`Допустимое кол-во символов username от ${username. min} до ${username. max} символов`)
];
