import Contact_Model from '../db/models/contact.js';

const getAllContacts = async () => {
  try {
    console.log('(Service) Fetching all contacts...');
    const contacts = await Contact_Model.find();
    console.log('(Service) Contacts:', contacts);

    // Return empty array instead of throwing error when no contacts found
    return contacts;
  } catch (error) {
    throw new Error(error);
  }
};

const getContactById = async (id) => {
  try {
    console.log('(Service) Fetching contact by id...');
    const contact = await Contact_Model.findById(id);
    console.log('(Service) Contact:', contact);

    // Check if contact exists
    if (!contact) {
      throw new Error('Contact not found');
    }

    return contact;
  } catch (error) {
    throw new Error(error.message || 'Contact not found');
  }
};

export { getAllContacts, getContactById };
