import { Router } from 'express';

import { getItems, postItems } from '../controllers/itemsController.js';

const itemsRouter = Router()
itemsRouter.get('/items', getItems)
itemsRouter.post('/items', postItems)
export default itemsRouter