import { Router } from 'express';

import { getItems, postItems } from '../controllers/itemsController.js';
import { itemMiddleware } from '../middlewares/itemMiddleware.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';

const itemsRouter = Router()
itemsRouter.use(tokenValidation)

itemsRouter.get('/items', getItems)
itemsRouter.post('/items', itemMiddleware, postItems)
export default itemsRouter