import {
  getAllContacts,
  getContactById,
  createContactService,
  updateContactService,
  deleteContactService,
  deleteUntilService,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';

const fetchAllContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const { isFavourite, contactType } = parseFilterParams(req.query);
  const userId = req.userID;
  const allContacts = await getAllContacts(
    userId,
    page,
    perPage,
    sortOrder,
    sortBy,
    isFavourite,
    contactType,
  );
  // Always return 200 status, even if contacts array is empty
  res.status(200).send({
    status: 200,
    message: `Successfully found ${allContacts.contacts.length} contacts!`,
    data: allContacts,
  });
};

const fetchContactById = async (req, res) => {
  const contactID = req.params.contactID;
  const userId = req.userID;
  const contact = await getContactById(contactID, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${contactID}!`,
    data: contact,
  });
};

const createContact = async (req, res) => {
  const userId = req.userID; // req.userID is the user ID from the authenticate middleware
  const contact = await createContactService({ userId, ...req.body });
  res.status(201).send({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

const updateContact = async (req, res) => {
  const { contactID } = req.params;
  const newFields = req.body;
  const userId = req.userID;
  const contact = await updateContactService(contactID, userId, newFields, {
    upsert: false,
  });
  res.status(200).send({
    status: 200,
    message: 'Successfully updated contact!',
    data: contact,
  });
};

const deleteContact = async (req, res) => {
  const contactID = req.params.contactID;
  const userId = req.userID;
  const contact = await deleteContactService(contactID, userId);
  res.status(200).send({
    status: 200,
    message: 'Successfully deleted contact!',
    data: contact,
  });
};

const deleteUntil = async (req, res) => {
  const { until } = req.body;
  const contacts = await deleteUntilService(until);
  res.status(200).send({
    status: 200,
    message: `Successfully deleted contacts! Remaining contacts: ${contacts.length}`,
    data: contacts,
  });
};

export { fetchAllContacts, fetchContactById, createContact, updateContact, deleteContact, deleteUntil };
