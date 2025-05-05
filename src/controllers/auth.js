import { registerService, loginService } from '../services/auth.js';
import createHttpError from 'http-errors';


const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerService(name, email, password);
  res.status(201).json(user);
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginService(email, password);
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }
  res.status(200).json(user);
};

export { registerController, loginController };
