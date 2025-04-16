import Contact_Model from '../db/models/contact.js';
import createHttpError from 'http-errors';
import calculatePaginationData from '../utils/calculatePaginationData.js';

const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortOrder = 'asc',
  sortBy = '_id',
  isFavourite = undefined,
  contactType = undefined,
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let filter = {};
  if (isFavourite === undefined) {
    filter = {};
  } else {
    filter = { isFavourite: isFavourite };
  }

  if (contactType === undefined) {
    filter = { ...filter };
  } else {
    filter = { ...filter, contactType: contactType };
  }

  const contactsQuery = Contact_Model.find(filter);

  const [contactsCount, contacts] = await Promise.all([
    Contact_Model.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  if (!contacts) {
    return [];
  }

  return { contacts: contacts, pagination: paginationData };
};

const getContactById = async (id) => {
  const contact = await Contact_Model.findById(id);
  return contact;
};

const createContactService = async (contact) => {
  const newContact = await Contact_Model.create(contact);
  return newContact;
};

const updateContactService = async (
  contactID,
  newFields,
  options = { upsert: false },
) => {
  const updatedContact = await Contact_Model.findOneAndUpdate(
    { _id: contactID },
    newFields,
    {
      new: true,
      ...options,
    },
  );
  return updatedContact;
};

const deleteContactService = async (contactID) => {
  const deletedContact = await Contact_Model.findOneAndDelete(
    { _id: contactID },
    { new: true },
  );
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  return deletedContact;
};

export {
  getAllContacts,
  getContactById,
  createContactService,
  updateContactService,
  deleteContactService,
};
