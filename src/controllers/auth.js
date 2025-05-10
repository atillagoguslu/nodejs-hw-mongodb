import {
  registerService,
  loginService,
  logoutService,
  refreshService,
  sendResetPasswordEmailService,
  resetPasswordService,
  getResetPasswordWrongPathService,
} from '../services/auth.js';
import createHttpError from 'http-errors';

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerService({ name, email, password });
  res.status(201).json({
    status: 201,
    message: 'User registered successfully',
    data: user,
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginService(email, password);
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  res.cookie('refreshToken', user.refreshToken, {
    httpOnly: true,
    expires: user.refreshTokenValidUntil,
  });

  const sessionID = user._id.toString();
  res.cookie('sessionID', sessionID, {
    httpOnly: true,
    expires: user.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'User logged in successfully and session created',
    // Refresh token is not sent to the client
    data: { accessToken: user.accessToken },
  });
};

const logoutController = async (req, res) => {
  const { sessionID } = req.cookies;
  await logoutService(sessionID);
  res.clearCookie('refreshToken');
  res.clearCookie('sessionID');
  res.status(204).json({
    status: 204, // No Content demekmiş
    message: 'User logged out successfully',
  });
};

const refreshController = async (req, res) => {
  const { sessionID } = req.cookies;
  const user = await refreshService(sessionID);
  res.cookie('refreshToken', user.refreshToken, {
    httpOnly: true,
    expires: user.refreshTokenValidUntil,
  });
  res.cookie('sessionID', user._id.toString(), {
    httpOnly: true,
    expires: user.refreshTokenValidUntil,
  });
  res.status(200).json({
    status: 200,
    message: 'Refresh token refreshed successfully',
    data: { accessToken: user.accessToken },
  });
};

const sendResetPasswordEmailController = async (req, res) => {
  const { email } = req.body;
  const result = await sendResetPasswordEmailService(email);
  if (!result) {
    throw createHttpError(500, 'Failed to send reset password email');
  }
  res.status(200).json({
    status: 200,
    message: 'Reset password email sent successfully',
    data: result,
  });
};

const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;
  const result = await resetPasswordService(token, password);
  if (!result) {
    throw createHttpError(500, 'Failed to reset password');
  }
  res.status(200).json({
    status: 200,
    message: 'Password reset successfully',
    data: result,
  });
};

const getResetPasswordWrongPathController = async (req, res) => {
  const { token } = req.query;
  const html = await getResetPasswordWrongPathService(token);
  if (!html) {
    throw createHttpError(500, 'Failed to get reset password wrong path');
  }
  res.send(html);
};

export {
  registerController,
  loginController,
  logoutController,
  refreshController,
  sendResetPasswordEmailController,
  resetPasswordController,
  getResetPasswordWrongPathController,
};
