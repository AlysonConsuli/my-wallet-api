import { Router } from 'express';

import { postLogin, postUsers } from '../controllers/authController.js';

const authRouter = Router()
authRouter.post('/users', postUsers)
authRouter.post('/login', postLogin)
export default authRouter