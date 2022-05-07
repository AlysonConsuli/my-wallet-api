import { Router } from 'express';

import { postLogin, postUsers } from '../controllers/authController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';
import { loginMiddleware } from '../middlewares/loginMiddleware.js';

const authRouter = Router()

authRouter.post('/users', userMiddleware, postUsers)
authRouter.post('/login', loginMiddleware, postLogin)
export default authRouter