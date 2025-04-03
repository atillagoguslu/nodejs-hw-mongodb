import { getAllContacts, getContactById } from '../services/contacts.js';
import notFoundHandler from '../middlewares/notFoundHandler.js'; 

const fetchAllContacts = async (req, res) => {
  const contacts = await getAllContacts();
  // Always return 200 status, even if contacts array is empty
  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const fetchContactById = async (req, res) => {
  const contact = await getContactById(req.params.id);
  if (!contact) {
    notFoundHandler(req, res);
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${req.params.id}!`,
    data: contact,
  });
};

export { fetchAllContacts, fetchContactById };
