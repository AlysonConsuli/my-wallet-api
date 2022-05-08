import { Router } from 'express';

import { postAutoLogin, postLogin, postUsers } from '../controllers/authController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';
import { loginMiddleware } from '../middlewares/loginMiddleware.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';

const authRouter = Router()

authRouter.post('/users', userMiddleware, postUsers)
authRouter.post('/login', loginMiddleware, postLogin)
authRouter.post('/auto-login', tokenValidation, postAutoLogin)
export default authRouter