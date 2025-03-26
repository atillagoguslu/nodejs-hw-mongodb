import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { fetchAllContacts, fetchContactById } from './controllers/contacts.js';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp());

  // All Routes below are for testing purposes ------------------
  app.get('/', (req, res) => {
    res.send({
      status: 200,
      message: 'Hello World',
      data: {},
    });
  });

  app.get('/contacts', fetchAllContacts);
  app.get('/contacts/:id', fetchContactById);
  // ------------------------------------------------------------

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
