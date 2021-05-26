import { body } from 'express-validator';

const title = { min: 3, max: 70 };
const description = { min: 10, max: 5000 };

export default [
  body('title', 'Enter the title')
    .isString()
    .withMessage('Title must be a string')
    .isLength(title)
    .withMessage(`Allowed number of characters in title from ${title. min} to ${title. max}`),
  body('description', 'Enter the description')
    .isString()
    .isLength(description)
    .withMessage(`Allowed number of characters in description from ${description. min} to ${description. max}`)
];
