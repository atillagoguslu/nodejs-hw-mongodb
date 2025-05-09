import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { fetchAllContacts, fetchContactById, createContact, updateContact, deleteContact, deleteUntil } from '../controllers/contacts.js';
import authenticate from '../middlewares/authenticate.js';
import generalWrapper from '../utils/generalWrapper.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validatorBody.js';
import { addContactSchema, updateContactSchema } from '../validators/contactsValidator.js';
import multerMiddleware from '../middlewares/multer.js';

const contactsRouter = Router();

// Starts with /contacts endpoint ----------------------------------------------------------------------108
contactsRouter.get('/', generalWrapper(authenticate), ctrlWrapper(fetchAllContacts));
contactsRouter.get('/:contactID', generalWrapper(authenticate), isValidId, ctrlWrapper(fetchContactById));
contactsRouter.post(
  '/',
  generalWrapper(authenticate),
  multerMiddleware.single('photo'),
  validateBody(addContactSchema),
  ctrlWrapper(createContact),
);
contactsRouter.patch('/:contactID', generalWrapper(authenticate), isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContact));
contactsRouter.delete('/:contactID', generalWrapper(authenticate), isValidId, ctrlWrapper(deleteContact));
contactsRouter.post('/delete-until', generalWrapper(authenticate), ctrlWrapper(deleteUntil));

export default contactsRouter;
