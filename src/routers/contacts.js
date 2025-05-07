import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { fetchAllContacts, fetchContactById, createContact, updateContact, deleteContact } from '../controllers/contacts.js';
import authenticate from '../middlewares/authenticate.js';

import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validatorBody.js';
import { addContactSchema, updateContactSchema } from '../validators/contactsValidator.js';

const contactsRouter = Router();

// Starts with /contacts endpoint
contactsRouter.get('/', authenticate, ctrlWrapper(fetchAllContacts));
contactsRouter.get('/:contactID', authenticate, isValidId, ctrlWrapper(fetchContactById));
contactsRouter.post('/', authenticate, validateBody(addContactSchema), ctrlWrapper(createContact));
contactsRouter.patch('/:contactID', authenticate, isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContact));
contactsRouter.delete('/:contactID', authenticate, isValidId, ctrlWrapper(deleteContact));

export default contactsRouter;
