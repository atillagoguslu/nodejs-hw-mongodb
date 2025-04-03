import Contact_Model from '../db/models/contact.js';

const getAllContacts = async () => {
  const contacts = await Contact_Model.find();
  if (!contacts) {
    return [];
  }
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact_Model.findById(id);
  return contact;
};

const createContactService = async (contact) => {
  const newContact = await Contact_Model.create(contact);
  return newContact;
};

const updateContactService = async (id, contact) => {
  const updatedContact = await Contact_Model.findByIdAndUpdate(id, contact, { new: true });
  return updatedContact;
};

const deleteContactService = async (id) => {
  const deletedContact = await Contact_Model.findByIdAndDelete(id);
  return deletedContact;
};

export { getAllContacts, getContactById, createContactService, updateContactService, deleteContactService };
