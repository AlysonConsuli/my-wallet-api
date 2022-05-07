import { Router } from 'express';

import { postLogin, postUsers } from '../controllers/authController.js';
import { userMidlleware } from '../middlewares/userMidlleware.js';
import { loginMidlleware } from '../middlewares/loginMidlleware.js';

const authRouter = Router()

authRouter.post('/users', userMidlleware, postUsers)
authRouter.post('/login', loginMidlleware , postLogin)
export default authRouter