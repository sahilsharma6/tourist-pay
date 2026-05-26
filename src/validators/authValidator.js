import { check } from 'express-validator';

export const signupValidator = [
  check('fullName', 'Full name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('passportNumber', 'Passport number is required').not().isEmpty(),
  check('nationality', 'Nationality is required').not().isEmpty(),
];

export const loginValidator = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];
