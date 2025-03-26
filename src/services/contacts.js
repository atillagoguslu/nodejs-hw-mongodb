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

export { getAllContacts, getContactById };
