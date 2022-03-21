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
    controller.readArticle,
    authenticate,
    validate(articleSchema)
);
articleRouter.post('/post',
    controller.addArticle,

    authenticate,
    permission(Roles.ADMIN),
    validate(articleSchema)
);
articleRouter.put('/:articleId',
    controller.updateArticle,

    authenticate,
    permission(Roles.ADMIN),

    validate(articleIdSchema, true),
    validate(articleSchema)
);
articleRouter.delete('/:articleId',
    controller.deleteArticle,

    authenticate,
    permission(Roles.ADMIN),
    validate(articleIdSchema, true)
);

export { articleRouter };