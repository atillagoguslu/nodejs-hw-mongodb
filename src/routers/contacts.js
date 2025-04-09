import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  fetchAllContacts,
  fetchContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validatorBody.js';
import { addContactSchema, updateContactSchema } from '../validators/contactsValidator.js';

const contactsRouter = Router();

// Starts with /contacts endpoint
contactsRouter.get('/', ctrlWrapper(fetchAllContacts));
contactsRouter.get('/:contactID', isValidId, ctrlWrapper(fetchContactById));

contactsRouter.post('/', validateBody(addContactSchema), ctrlWrapper(createContact));
contactsRouter.patch('/:contactID', 
  isValidId, 
  validateBody(updateContactSchema), 
  ctrlWrapper(updateContact)
);
contactsRouter.delete('/:contactID', isValidId, ctrlWrapper(deleteContact));

export default contactsRouter;
