import Contact_Model from '../db/models/contact.js';
import createHttpError from 'http-errors';
import calculatePaginationData from '../utils/calculatePaginationData.js';

const getAllContacts = async (page, perPage) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact_Model.find();
  console.log('contactsQuery (Without await):', contactsQuery);
  const contactsCount = await Contact_Model.find().merge(contactsQuery).countDocuments();
  console.log('contactsCount (With await):', contactsCount);

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();
  console.log('contacts (With await):', contacts);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  if (!contacts) {
    return [];
  }

  return { data: contacts, pagination: paginationData };
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
