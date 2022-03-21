import * as controller from '../controllers/auth.controller';
import validate from '../middlewares/validate.middleware';

import { Router } from 'express';
import { loginSchema, registerSchema } from '../validations/user.validation';

const authRouter = Router();

authRouter.post('/login', validate(loginSchema), controller.login);
authRouter.post('/register', validate(registerSchema), controller.register);

export { authRouter };