import { body } from 'express-validator';

const title = { min: 3, max: 70 };
const description = { min: 10, max: 5000 };

export default [
  body('title', 'Введите название')
    .isString()
    .withMessage('Название должно быть строкой')
    .isLength(title)
    .withMessage(`Допустимое кол-во символов названия от ${title. min} до ${title. max} символов`),
  body('description', 'Введите описание')
    .isString()
    .isLength(description)
    .withMessage(`Допустимое кол-во символов описания от ${description. min} до ${description. max} символов`)
];
