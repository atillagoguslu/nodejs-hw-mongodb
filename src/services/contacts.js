import Contact_Model from '../db/models/contact.js';

const getAllContacts = async () => {
  try {
    const contacts = await Contact_Model.find();
    // Return empty array instead of throwing error when no contacts found
    if (!contacts) {
      return [];
    }
    return contacts;
  } catch (error) {
    throw new Error(error);
  }
};

const getContactById = async (id) => {
  try {
    const contact = await Contact_Model.findById(id);

    if (!contact) {
      throw new Error('Contact not found');
    }

    return contact;
  } catch (error) {
    throw new Error(error.message || 'Contact not found');
  }
};

const createContactService = async (contact) => {
  try {
    const newContact = await Contact_Model.create(contact);
    return newContact;
  } catch (error) {
    throw new Error(error.message || 'Failed to create contact');
  }
};

const updateContactService = async (id, contact) => {
  try {
    const updatedContact = await Contact_Model.findByIdAndUpdate(id, contact, { new: true });
    return updatedContact;
  } catch (error) {
    throw new Error(error.message || 'Failed to update contact');
  }
};

const deleteContactService = async (id) => {
  try {
    const deletedContact = await Contact_Model.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete contact');
  }
};

export { getAllContacts, getContactById, createContactService, updateContactService, deleteContactService };
