import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/auth.js';

const registerService = async (userData) => {
  const { name, email, password } = userData;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  console.log('In Register Service: Password:', password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('In Register Service: Hashed Password:', hashedPassword);
  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  return newUser;
};

const loginService = async (email, password) => {
  console.log('In Login Service: Email:', email);
  console.log('In Login Service: Password:', password);
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('In Login Service: Is Password Valid:', isPasswordValid);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  return user;
};

export { registerService, loginService };
