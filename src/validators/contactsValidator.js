import Joi from 'joi';

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().min(3).max(20).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
});

// const exampleContact = {
//   name: 'John Doe',
//   email: 'john@example.com',
//   phone: '1234567890',
//   favorite: true,
// };

// const exampleAbsentInfoContact = {
//   name: 'John Doe',
//   email: 'john@example.com',
//   phone: '1234567890',
// };

// const result = addContactSchema.validate(exampleContact, { abortEarly: false });
// console.log('result', result);

// const result2 = addContactSchema.validate(exampleAbsentInfoContact, { abortEarly: false });
// console.log('result2', result2);

export { addContactSchema, updateContactSchema };
