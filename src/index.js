import connectToMongoDB from './db/initMongoConnection.js';
import setupServer from './server.js';

const bootstrap = async () => {
  await connectToMongoDB();
  setupServer();
};

bootstrap();
