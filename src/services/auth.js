import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/auth.js';
import Sessions from '../db/models/sessions.js';
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

  console.log('In Login Service: User ID:', user._id);
  console.log('In Login Service: Access Token:', accessToken);
  console.log('In Login Service: Refresh Token:', refreshToken);
  console.log('In Login Service: Access Token Valid Until:', accessTokenValidUntil);
  console.log('In Login Service: Refresh Token Valid Until:', refreshTokenValidUntil);

  const session = await Sessions.findOne({ userID: user._id });
  if (session) {
    console.log('In Login Service: Session found');
    await Sessions.deleteOne({ _id: session._id });
    console.log('In Login Service: Session deleted');
  } else {
    console.log('In Login Service: Session not found and will be created');
  }

  const newSession = await Sessions.create({
    userID: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
  console.log('In Login Service: New Session created');
  return newSession;
};

const logoutService = async (sessionID) => {
  await Sessions.findByIdAndDelete(sessionID);
};

const refreshService = async ({ refreshToken, sessionID }) => {
  const Session = await Sessions.findOne({ refreshToken, userID: sessionID });
  if (!Session) {
    throw createHttpError(401, 'Invalid refresh token');
  }
  if (Session.refreshTokenValidUntil < Date.now()) {
    throw createHttpError(401, 'Refresh token expired');
  }
  //Buradan sonrası token oluşturma işlemi yapılacak
  const newAccessToken = randomBytes(30).toString('base64');
  const newRefreshToken = randomBytes(30).toString('base64');
  const newAccessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const newRefreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  console.log('In Refresh Service: User ID:', Session.userID);
  console.log('In Refresh Service: Access Token:', newAccessToken);
  console.log('In Refresh Service: Refresh Token:', newRefreshToken);
  console.log('In Refresh Service: Access Token Valid Until:', newAccessTokenValidUntil);
  console.log('In Refresh Service: Refresh Token Valid Until:', newRefreshTokenValidUntil);

  const oldSession = await Sessions.findOne({ userID: Session.userID });
  if (oldSession) {
    console.log('In Refresh Service: Session found');
    await Sessions.deleteOne({ _id: oldSession._id });
    console.log('In Refresh Service: Session deleted');
  }

  const newSession = await Sessions.create({
    userID: Session.userID,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: newAccessTokenValidUntil,
    refreshTokenValidUntil: newRefreshTokenValidUntil,
  });
  console.log('In Refresh Service: New Session refreshed');
  return newSession;
};
export { registerService, loginService, logoutService, refreshService };
