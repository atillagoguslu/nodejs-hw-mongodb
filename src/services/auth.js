import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/auth.js';
import { randomBytes } from 'node:crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/timesForTokens.js';

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

  //Buradan sonrası token oluşturma işlemi yapılacak
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  const session = await Session.create({
    user: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return session;
};

export { registerService, loginService };
