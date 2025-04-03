import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import rootRouter from './routers/root.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp());
  // --------------------------------------- All Routes are below
  app.use('/', rootRouter);
  app.use('/contacts', contactsRouter);
  // ------------------------------------------------------------

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

  return app;
};

export default setupServer;
