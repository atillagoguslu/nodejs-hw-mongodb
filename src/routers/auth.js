import { Router } from 'express';
import { authValidator, loginValidator } from '../validators/authValidator.js';
import { validateBody } from '../middlewares/validatorBody.js';

const authRouter = Router();

// Starts with /auth endpoint
authRouter.post('/register', validateBody(authValidator), (req, res) => {
  res.status(201).json({ message: 'User registered successfully' });
});

authRouter.post('/login', validateBody(loginValidator), (req, res) => {
  res.status(200).json({ message: 'User logged in successfully' });
});



export default authRouter;
