import Contact_Model from '../db/models/contact.js';
import createHttpError from 'http-errors';
const getAllContacts = async () => {
  const contacts = await Contact_Model.find();
  if (!contacts) {
    return [];
  }
  return contacts;
};

const getContactById = async (id) => {
  console.log('getContactById:', id);
  const contact = await Contact_Model.findById(id);
  return contact;
};

const createContactService = async (contact) => {
  const newContact = await Contact_Model.create(contact);
  return newContact;
};

const updateContactService = async (contactID, newFields, options = { upsert: false }) => {
  const updatedContact = await Contact_Model.findOneAndUpdate({ _id: contactID }, newFields, {
    new: true,
    ...options,
  });
  return updatedContact;
};

const deleteContactService = async (contactID) => {
  const deletedContact = await Contact_Model.findOneAndDelete({ _id: contactID }, { new: true });
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  return deletedContact;
};

export { getAllContacts, getContactById, createContactService, updateContactService, deleteContactService };
