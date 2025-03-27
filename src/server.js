import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import homeRouter from './routers/home.js';
import contactsRouter from './routers/contacts.js';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp());

  // All Routes are below ---------------------------------------
  app.use('/', homeRouter);
  app.use('/contacts', contactsRouter);
  // ------------------------------------------------------------

  app.use('*', (req, res) => {
    res.status(404).send({
      status: 404,
      message: 'Not found (Endpoint does not exist)',
      data: {},
    });
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

  return app;
};

export default setupServer;
