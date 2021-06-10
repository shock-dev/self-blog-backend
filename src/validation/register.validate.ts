import { body } from 'express-validator';

const email = { min: 6, max: 70 };
const username = { min: 2, max: 50 };
const fullname = { min: 6, max: 50 };
const password = { min: 6, max: 50 };

export default [
  body('email', 'Введите email')
    .isString()
    .withMessage('Email должен быть строкой')
    .isEmail()
    .withMessage('Некорректно введет email')
    .isLength(email)
    .withMessage(`Допустимое кол-во символов email от ${email. min} до ${email. max} символов`),

  body('fullname', 'Введите полное имя')
    .isString()
    .withMessage('Полное имя должно быть строкой')
    .isLength(fullname)
    .withMessage(`Допустимое кол-во символов полного имени от ${fullname. min} до ${fullname. max} символов`),

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
