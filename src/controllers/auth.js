import { registerService, loginService } from '../services/auth.js';
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
  res.status(200).json({
    status: 200,
    message: 'User logged in successfully',
    data: user,
  });
};

export { registerController, loginController };
