import connectToMongoDB from './db/initMongoConnection.js';
import setupServer from './server.js';
import dotenv from 'dotenv';
import createFoldersIfNotExist from './utils/createFoldersIfNotExist.js';
import { TEMP_FOLDER, UPLOAD_FOLDER } from './constants/uploads.js';

dotenv.config();

const bootstrap = async () => {
  await connectToMongoDB();
  await createFoldersIfNotExist(TEMP_FOLDER);
  await createFoldersIfNotExist(UPLOAD_FOLDER);
  setupServer();
};

bootstrap();
