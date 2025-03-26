import Contact_Model from '../db/models/contact.js';

const getAllContacts = async () => {
  try {
    const contacts = await Contact_Model.find();
    return contacts;
  } catch (error) {
    throw new Error(error);
  }
};

const getContactById = async (id) => {
  try {
    const contact = await Contact_Model.findById(id);
    return contact;
  } catch (error) {
    throw new Error(error);
  }
};

export { getAllContacts, getContactById };
