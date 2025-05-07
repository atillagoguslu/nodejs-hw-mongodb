import { registerService, loginService, logoutService } from '../services/auth.js';
import createHttpError from 'http-errors';

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerService({ name, email, password });

  console.log('In Register Controller: User:', user);
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

  res.cookie('sessionID', user._id, {
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
export { registerController, loginController, logoutController };
