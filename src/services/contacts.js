import Contact_Model from '../db/models/contact.js';
import createHttpError from 'http-errors';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { conGREEN, conRED, conYELLOW } from '../constants/console_colors.js';

const getAllContacts = async (
  userId,
  page = 1,
  perPage = 10,
  sortOrder = 'asc',
  sortBy = '_id',
  isFavourite = undefined,
  contactType = undefined,
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let filter = { userId };
  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite;
  }
  if (contactType !== undefined) {
    filter.contactType = contactType;
  }

  console.log('IN CONTACTS SERVICE filter:', filter);
  const contactsQuery = Contact_Model.find(filter);
  console.log('IN CONTACTS SERVICE contactsQuery:', contactsQuery);
  const [contactsCount, contacts] = await Promise.all([
    Contact_Model.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  console.log('IN CONTACTS SERVICE contactsCount:', contactsCount);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  if (!contacts) {
    return [];
  }

  return { contacts: contacts, pagination: paginationData };
};

const getContactById = async (id, userId) => {
  const contact = await Contact_Model.findOne({ _id: id, userId });
  return contact;
};

const createContactService = async (contact) => {
  const { userId, ...contactData } = contact;
  const newContact = await Contact_Model.create({ userId, ...contactData });
  return newContact;
};

const updateContactService = async (contactID, userId, newFields, options = { upsert: false }) => {
  const updatedContact = await Contact_Model.findOneAndUpdate({ _id: contactID, userId }, newFields, {
    new: true,
    ...options,
  });
  return updatedContact;
};

const deleteContactService = async (contactID, userId) => {
  const deletedContact = await Contact_Model.findOneAndDelete({ _id: contactID, userId }, { new: true });
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  return deletedContact;
};

const deleteUntilService = async (until) => {
  try {
    const total = await Contact_Model.countDocuments();
    if (total <= until) {
      console.info(
        conYELLOW,
        `No contacts removed. Total contacts (${total}) is less than or equal to UNTIL (${until}).`,
      );
      return [];
    }
    // Find the _ids of the contacts to remove (the last ones, sorted by createdAt desc)
    const toRemove = await Contact_Model.find({}, '_id').sort({ createdAt: -1 }).skip(until).lean();
    const idsToRemove = toRemove.map((doc) => doc._id);
    const result = await Contact_Model.deleteMany({ _id: { $in: idsToRemove } });
    console.info(conGREEN, `Removed ${result.deletedCount} contacts. ${until} contacts remain.`);
    return result;
  } catch (error) {
    console.error(conRED, 'Error removing contacts:', error);
    throw createHttpError(500, 'Error removing contacts');
  }
};

export {
  getAllContacts,
  getContactById,
  createContactService,
  updateContactService,
  deleteContactService,
  deleteUntilService,
};
