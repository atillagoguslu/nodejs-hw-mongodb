import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../db/models/auth.js';
import Sessions from '../db/models/sessions.js';
import { randomBytes } from 'node:crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/timesForTokens.js';
import sendMail from '../utils/sendMail.js';
import JWT from 'jsonwebtoken';
import path from 'node:path';
import fs from 'node:fs';
import handlebars from 'handlebars';

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

const sendResetPasswordEmailService = async (email) => {
  console.log('In Send Reset Password Email Service: Email:', email);
  const userForReset = await User.findOne({ email });
  console.log('In Send Reset Password Email Service: User For Reset:', userForReset);
  if (!userForReset) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = JWT.sign({ sub: userForReset._id, email: userForReset.email }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  // Preparing the reset url
  const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
  // Preparing the Handlebars template
  const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');
  const TEMPLATE_PATH = path.join(TEMPLATE_DIR, 'reset-mail.html');
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const compiledTemplate = handlebars.compile(template.toString());
  const htmlContent = compiledTemplate({ name: userForReset.name, url: resetUrl });

  await sendMail({
    from: `${process.env.BREVO_SMTP_FROM}`,
    to: userForReset.email,
    subject: 'Reset Password',
    html: htmlContent,
  });

  return resetToken;
};

const resetPasswordService = async (token, newPassword) => {
  console.log('In Reset Password Service: Token:', token);
  console.log('In Reset Password Service: New Password:', newPassword);
  let decoded;
  try {
    decoded = JWT.verify(token, process.env.JWT_SECRET);
    console.log('In Reset Password Service: Decoded:', decoded);
  } catch (error) {
    console.log('In Reset Password Service: Error:', error);
    throw createHttpError(401, 'Invalid token: ' + error.message);
  }
  const userToNewPassword = await User.findById(decoded.sub);
  console.log('In Reset Password Service: User To New Password:', userToNewPassword);
  if (!userToNewPassword) {
    throw createHttpError(404, 'User not found');
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log('In Reset Password Service: Hashed Password:', hashedPassword);
  await User.findByIdAndUpdate(userToNewPassword._id, { password: hashedPassword });
  return [];
};

const getResetPasswordWrongPathService = async (token) => {
  const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');
  const WRONG_PATH_TEMPLATE_PATH = path.join(TEMPLATE_DIR, 'wrongPath.html');
  const template = fs.readFileSync(WRONG_PATH_TEMPLATE_PATH, 'utf8');
  const compiledTemplate = handlebars.compile(template.toString());
  const htmlContent = compiledTemplate({ token });
  console.log('In Get Reset Password Wrong Path Service: HTML Content:', htmlContent);
  return [];
};

export {
  registerService,
  loginService,
  logoutService,
  refreshService,
  sendResetPasswordEmailService,
  resetPasswordService,
  getResetPasswordWrongPathService,
};
