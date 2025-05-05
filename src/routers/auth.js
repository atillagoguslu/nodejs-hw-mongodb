import { Router } from 'express';
import { authValidator, loginValidator } from '../validators/authValidator.js';
import { validateBody } from '../middlewares/validatorBody.js';
import { registerController, loginController } from '../controllers/auth.js';

const authRouter = Router();

// Starts with /auth endpoint
authRouter.post('/register', validateBody(authValidator), registerController);
authRouter.post('/login', validateBody(loginValidator), loginController);

export default authRouter;
