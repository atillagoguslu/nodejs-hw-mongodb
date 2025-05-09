import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validatorBody.js';
import {
  registerValidator,
  loginValidator,
  sendResetEmailValidator,
  resetPasswordValidator,
} from '../validators/authValidator.js';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  sendResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const authRouter = Router();

// Starts with /auth endpoint -----------------------------------------------80-------------------------------------120
authRouter.post('/register', validateBody(registerValidator), ctrlWrapper(registerController));
authRouter.post('/login', validateBody(loginValidator), ctrlWrapper(loginController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post(
  '/send-reset-email',
  validateBody(sendResetEmailValidator),
  ctrlWrapper(sendResetPasswordEmailController),
);
authRouter.post('/reset-password', validateBody(resetPasswordValidator), ctrlWrapper(resetPasswordController));

authRouter.post('/', async (req, res) => {
  res.status(200).json({
    message: 'This is Auth endpoint. Use /register or /login',
  });
});
// --------------------------------------------------------------------------80-------------------------------------120

export default authRouter;
