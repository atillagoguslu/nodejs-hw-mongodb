import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import rootRouter from './routers/root.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { conBLUE } from './constants/console_colors.js';
import { UPLOAD_FOLDER } from './constants/uploads.js';

const PORT = process.env.PORT;

const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    }),
  );

  // Serve static files from the uploads folder
  app.use('/uploads', express.static(UPLOAD_FOLDER));

  // ----------------------------------- All Routes are below ---
  app.use('/', rootRouter);
  app.use('/contacts', contactsRouter);

  app.use('/auth', authRouter);

  // ------------------------------------------------------------
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.info(conBLUE, `Server is running on port ${PORT}`);
  });
  return app;
};

export default setupServer;
