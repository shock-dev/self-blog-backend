const { body } = require('express-validator');

const email = { min: 6, max: 70 };
const username = { min: 2, max: 50 };
const name = { min: 2, max: 25 };
const surname = { min: 2, max: 25 };
const password = { min: 6, max: 50 };

module.exports = [
  body('email', 'Введите email')
    .isString()
    .withMessage('Email должен быть строкой')
    .isEmail()
    .withMessage('Некорректно введет email')
    .isLength(email)
    .withMessage(`Допустимое кол-во символов email от ${email. min} до ${email. max} символов`),

  body('name', 'Введите имя')
    .isString()
    .withMessage('Имя должно быть строкой')
    .isLength(name)
    .withMessage(`Допустимое кол-во символов имени от ${name. min} до ${name. max} символов`),

  body('surname', 'Введите фамилию')
    .isString()
    .withMessage('Фамилия должна быть строкой')
    .isLength(surname)
    .withMessage(`Допустимое кол-во символов полного фамилии от ${surname. min} до ${surname. max} символов`),

  body('username', 'Введите username')
    .isString()
    .withMessage('Username должен быть строкой')
    .isLength(username)
    .withMessage(`Допустимое кол-во символов username от ${username. min} до ${username. max} символов`),

  body('birthday', 'Отсутствует дата рождения')
    .isDate({
      format: 'DD/MM/YYYY',
      delimiters: ['/', '.']
    })
    .withMessage('Некорректный формат даты'),

  body('password', 'Введите пароль')
    .isString()
    .isLength(password)
    .withMessage(`Допустимое кол-во символов пароля от ${password. min}`),

  body('passwordConfirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Не удалось подтвердить пароль');
      }

      return true;
    })
];
