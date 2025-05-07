import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { conBLUE, conGREEN, conRED } from '../constants/console_colors.js';

dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_DB = process.env.MONGODB_DB;
const MONGODB_OPTIONS = process.env.MONGODB_OPTIONS;

const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}${
  MONGODB_OPTIONS ? `?${MONGODB_OPTIONS}` : ''
}`;

const connectToMongoDB = async () => {
  try {
    console.info(conBLUE, 'Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.info(conGREEN, 'Mongo connection successfully established!');
  } catch (error) {
    console.error(conRED, 'Error connecting to MongoDB:', error);
  }
};

export default connectToMongoDB;
