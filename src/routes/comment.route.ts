import * as controller from '../controllers/comment.controller';
import validate from '../middlewares/validate.middleware';
import authenticate from '../middlewares/authenticate.middleware';

import { Router } from 'express';
import { articleIdSchema } from '../validations/article.validation';
import {
    commentIdSchema,
    commentSchema
} from '../validations/comment.validation';

const commentRouter = Router();
const baseUrl = '/:articleId/comments';

commentRouter.get(
    `${baseUrl}/:commentId`,
    validate(commentIdSchema, true),

    controller.readComment
);
commentRouter.post(
    `${baseUrl}/`,

    authenticate,
    validate(articleIdSchema, true),
    validate(commentSchema),

    controller.addComment
);
commentRouter.put(
    `${baseUrl}/:commentId`,

    authenticate,
    validate(commentIdSchema, true),
    validate(commentSchema),

    controller.updateComment
);
commentRouter.delete(
    `${baseUrl}/:commentId`,

    authenticate,
    validate(commentIdSchema, true),

    controller.updateComment
);

export { commentRouter };