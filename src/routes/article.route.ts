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

articleRouter.get('/:articleId',
    authenticate,
    validate(articleSchema),

    controller.readArticle
);
articleRouter.post('/',
    authenticate,
    permission(Roles.ADMIN),
    validate(articleSchema),

    controller.addArticle
);
articleRouter.put('/:articleId',
    authenticate,
    permission(Roles.ADMIN),

    validate(articleIdSchema, true),
    validate(articleSchema),

    controller.updateArticle,
);
articleRouter.delete('/:articleId',
    authenticate,
    permission(Roles.ADMIN),
    validate(articleIdSchema, true),

    controller.deleteArticle
);

export { articleRouter };