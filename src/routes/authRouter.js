import { Router } from 'express';

import { deleteSession, postAutoLogin, postLogin, postUsers } from '../controllers/authController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';
import { loginMiddleware } from '../middlewares/loginMiddleware.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';
import { logoutMiddleware } from '../middlewares/logoutMiddleware.js';

const authRouter = Router()

authRouter.post('/users', userMiddleware, postUsers)
authRouter.post('/login', loginMiddleware, postLogin)
authRouter.post('/auto-login', tokenValidation, postAutoLogin)
authRouter.delete('/session', logoutMiddleware, deleteSession)
export default authRouter