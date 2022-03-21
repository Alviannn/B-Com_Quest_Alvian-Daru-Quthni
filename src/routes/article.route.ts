import * as controller from '../controllers/article.controller';
import validate from '../middlewares/validate.middleware';
import permission from '../middlewares/permission.middleware';
import authenticate from '../middlewares/authenticate.middleware';

import { Router } from 'express';
import { Roles } from '../entities/user.entity';
import {
    articleIdSchema,
    articleSchema
} from '../validations/article.validation';

const articleRouter = Router();

articleRouter.get('/', controller.getAllArticle);

articleRouter.post('/',
    validate(articleSchema),
    authenticate,
    permission(Roles.ADMIN),

    controller.addArticle
);
articleRouter.put('/:articleId',
    validate(articleIdSchema, true),
    validate(articleSchema),

    authenticate,
    permission(Roles.ADMIN),

    controller.updateArticle,
);
articleRouter.delete('/:articleId',
    validate(articleIdSchema, true),

    authenticate,
    permission(Roles.ADMIN),

    controller.deleteArticle
);
articleRouter.get('/:articleId',
    validate(articleIdSchema, true),
    controller.readArticle
);

export { articleRouter };