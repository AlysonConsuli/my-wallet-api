import { Router } from 'express';

import { getItems, postItems } from '../controllers/itemsController.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';

const itemsRouter = Router()
itemsRouter.use(tokenValidation)

itemsRouter.get('/items', getItems)
itemsRouter.post('/items', postItems)
export default itemsRouter