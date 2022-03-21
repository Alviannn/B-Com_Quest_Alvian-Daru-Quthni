import * as controller from '../controllers/auth.controller';
import validate from '../middlewares/validate.middleware';

import { Router } from 'express';
import { loginSchema, registerSchema } from '../validations/user.validation';

const authRouter = Router();

authRouter.post('/login', controller.login, validate(loginSchema));
authRouter.post('/register', controller.register, validate(registerSchema));

export { authRouter };