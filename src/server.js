import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pinoHttp } from 'pino-http';

dotenv.config();

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(pinoHttp());


  // All Routes below are for testing purposes
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get('/contacts', (req, res) => {
    res.send('Hello World');
  });









  app.use('*', (req, res) => {
    res.status(404).send({ message: 'Not found' });
  });
  
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

  return app;
};

export default setupServer;
