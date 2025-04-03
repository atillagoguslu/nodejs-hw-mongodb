import { Router } from 'express';
import { fetchAllContacts, fetchContactById, createContact, updateContact, deleteContact } from '../controllers/contacts';
import ctrlWrapper from '../utils/ctrlWrapper';

const contactsRouter = Router();

// Starts with /contacts endpoint
contactsRouter.get('/', ctrlWrapper(fetchAllContacts));
contactsRouter.get('/:id', ctrlWrapper(fetchContactById));

contactsRouter.post('/', ctrlWrapper(createContact));
contactsRouter.put('/:id', ctrlWrapper(updateContact));
contactsRouter.delete('/:id', ctrlWrapper(deleteContact));

export default contactsRouter;
