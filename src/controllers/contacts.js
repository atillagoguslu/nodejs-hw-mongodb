import { getAllContacts, getContactById } from '../services/contacts.js';

const fetchAllContacts = async (req, res) => {
  try {
    console.log('(Controller) Fetching all contacts...');
    const contacts = await getAllContacts();
    console.log('(Controller) Fetching all contacts:', contacts);

    // Always return 200 status, even if contacts array is empty
    res.status(200).send({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: 'Contacts not found',
      error: error.message,
    });
  }
};

const fetchContactById = async (req, res) => {
  try {
    console.log('(Controller) Fetching contact by id...');
    const contact = await getContactById(req.params.id);

    if (!contact) {
      res.status(404).send({
        status: 404,
        message: 'Contact not found',
        error: 'Contact not found',
      });
    }

    res.status(200).send({
      status: 200,
      message: `Successfully found contact with id ${req.params.id}!`,
      data: contact,
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: 'Contact not found',
      error: error.message,
    });
  }
};

export { fetchAllContacts, fetchContactById };
