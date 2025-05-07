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
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
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

  //Buradan sonrası token oluşturma işlemi yapılacak
  const accessToken = randomBytes(30).toString('hex');
  const refreshToken = randomBytes(30).toString('hex');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  const session = await Sessions.findOne({ userID: user._id });
  if (session) {
    await Sessions.deleteOne({ _id: session._id });
  }

  const newSession = await Sessions.create({
    userID: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
  return newSession;
};

const logoutService = async (sessionID) => {
  console.log('In Logout Service: Session ID:', sessionID);
  const closedSession = await Sessions.findByIdAndDelete(sessionID);
  console.log('In Logout Service: Closed Session:', closedSession);
  if (!closedSession) {
    throw createHttpError(401, 'Invalid session ID');
  }
  return closedSession;
};

const refreshService = async (sessionID) => {
  const Session = await Sessions.findById(sessionID);
  if (!Session) {
    throw createHttpError(401, 'Invalid refresh token');
  }
  if (Session.refreshTokenValidUntil < Date.now()) {
    throw createHttpError(401, 'Refresh token expired');
  }
  //Buradan sonrası token oluşturma işlemi yapılacak
  const newAccessToken = randomBytes(30).toString('hex');
  const newRefreshToken = randomBytes(30).toString('hex');
  const newAccessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const newRefreshTokenValidUntil = new Date(Date.now() + ONE_DAY);

  const oldSession = await Sessions.findOne({ userID: Session.userID });
  if (oldSession) {
    await Sessions.deleteOne({ _id: oldSession._id });
  }

  const newSession = await Sessions.create({
    userID: Session.userID,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: newAccessTokenValidUntil,
    refreshTokenValidUntil: newRefreshTokenValidUntil,
  });
  return newSession;
};
export { registerService, loginService, logoutService, refreshService };
