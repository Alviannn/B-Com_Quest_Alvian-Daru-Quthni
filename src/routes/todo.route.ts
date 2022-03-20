import { Router } from 'express';
import * as controller from '../controllers/todo.controller';

const todoRouter = Router();

todoRouter.get('/', controller.homePage);
todoRouter.get('/insert', controller.insertPage);
todoRouter.get('/update', controller.updatePage);

export { todoRouter };