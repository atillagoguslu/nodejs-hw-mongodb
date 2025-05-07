import { Router } from 'express';
import { registerValidator, loginValidator } from '../validators/authValidator.js';
import validateBody from '../middlewares/validatorBody.js';
import { registerController, loginController, logoutController, refreshController } from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const authRouter = Router();

// Starts with /auth endpoint
authRouter.post('/register', validateBody(registerValidator), ctrlWrapper(registerController));
authRouter.post('/login', validateBody(loginValidator), ctrlWrapper(loginController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/', async (req, res) => {
  res.status(200).json({
    message: 'This is Auth endpoint. Use /register or /login',
  });
});
export default authRouter;
