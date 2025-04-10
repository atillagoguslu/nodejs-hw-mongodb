import Contact_Model from '../db/models/contact.js';
import createHttpError from 'http-errors';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import SORT_ORDER from '../constants/sortOrder.js';
import FAVOURITE from '../constants/favourite.js';

// All Mongoose methods and settings:
// https://mongoosejs.com/docs/api.html

const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  isFavourite = FAVOURITE.ALL,
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let filter = {};
  if (isFavourite === FAVOURITE.ALL || isFavourite === undefined) {
    filter = {};
  } else {
    filter = { isFavourite: isFavourite };
  }

  console.log('Favourite in service:', FAVOURITE.ALL);
  console.log('Filter in service:', filter);
  const contactsQuery = Contact_Model.find(filter);

  // We write this with Promise.all to not couses performance issues
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
