import Joi from 'joi';

const registerValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
}).strict();

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
}).strict();

const sendResetEmailValidator = Joi.object({
  email: Joi.string().email().required(),
}).strict();

const resetPasswordValidator = Joi.object({
  // token: Joi.string().regex(/^ey/).required(),
  password: Joi.string().min(6).max(30).required(),
}).strict();

export { registerValidator, loginValidator, sendResetEmailValidator, resetPasswordValidator };
