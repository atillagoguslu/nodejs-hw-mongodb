import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/auth.js';

const registerService = async (name, email, password) => {
  console.log('In Register Service: Name:', name);
  console.log('In Register Service: Email:', email);
  console.log('In Register Service: Password:', password);
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('In Register Service: Hashed Password:', hashedPassword);
  const newUser = await User.create({ name, email, password: hashedPassword });
  console.log('In Register Service: New User:', newUser);
  return newUser;
};

const loginService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }
  return user;
};

export { registerService, loginService };
