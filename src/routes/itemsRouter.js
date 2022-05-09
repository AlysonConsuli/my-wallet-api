import { Router } from 'express';

import { deleteItem, getItems, postItems, uptadeItem } from '../controllers/itemsController.js';
import { itemMiddleware } from '../middlewares/itemMiddleware.js';
import { tokenValidation } from '../middlewares/tokenValidationMiddleware.js';

const itemsRouter = Router()
itemsRouter.use(tokenValidation)

itemsRouter.get('/items', getItems)
itemsRouter.post('/items', itemMiddleware, postItems)
itemsRouter.delete('/items/:itemId', deleteItem)
itemsRouter.put('/items/:itemId', uptadeItem)
export default itemsRouter