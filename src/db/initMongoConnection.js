import mongoose from 'mongoose';

// const MONGODB_USER = process.env.MONGODB_USER;
// const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
// const MONGODB_URL = process.env.MONGODB_URL;
// const MONGODB_DB = process.env.MONGODB_DB;
// const MONGODB_OPTIONS = process.env.MONGODB_OPTIONS;

// const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}${
//   MONGODB_OPTIONS ? `?${MONGODB_OPTIONS}` : ''
// }`;

const MONGODB_URI =
  'mongodb+srv://atillagoguslu:Db0F4FymzQUcq1ph@myclusterfornodejs.v9bs8.mongodb.net/?retryWrites=true&w=majority&appName=MyClusterForNodeJS';

const connectToMongoDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToMongoDB;
