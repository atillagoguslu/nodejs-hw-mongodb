import Contact_Model from '../db/models/contact.js';

const getAllContacts = async (req, res) => {
  const contacts = await Contact_Model.find();
  res.status(200).json(contacts);
};

export { getAllContacts };
