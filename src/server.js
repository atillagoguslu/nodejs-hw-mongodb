import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp());

  // All Routes below are for testing purposes
  app.get('/', (req, res) => {
    res.send({
      status: 200,
      message: 'Hello World',
      data: {},
    });
  });

  app.get('/contacts', (req, res) => {
    try {
      const contacts = getAllContacts();
      res.status(200).send({
        status: 200,
        message: 'Contacts fetched successfully',
        data: contacts,
      });
    } catch (error) {
      res.status(404).send({
        status: 404,
        message: 'Contacts not found',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:id', (req, res) => {
    try {
      const contact = getContactById(req.params.id);
      res.status(200).send({
        status: 200,
        message: 'Contact fetched successfully',
        data: contact,
      });
    } catch (error) {
      res.status(404).send({
        status: 404,
        message: 'Contact not found',
        error: error.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).send({
      status: 404,
      message: 'Not found',
      data: {},
    });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

  return app;
};

export default setupServer;
