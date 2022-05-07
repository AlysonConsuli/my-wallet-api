import { Router } from 'express';

import { postLogin, postUsers } from '../controllers/authController.js';
import { userSchemaMidlleware } from '../middlewares/userSchemaMidlleware.js';

const authRouter = Router()
authRouter.post('/users', userSchemaMidlleware, postUsers)
authRouter.post('/login', postLogin)
export default authRouter