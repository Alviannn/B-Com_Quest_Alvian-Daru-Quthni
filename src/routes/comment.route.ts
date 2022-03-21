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

commentRouter.get(
    '/comments/:commentId',
    validate(commentIdSchema, true),

    controller.readComment
);
commentRouter.post(
    '/comments',

    validate(articleIdSchema, true),
    validate(commentSchema),
    authenticate,

    controller.addComment
);
commentRouter.put(
    '/comments/:commentId',

    validate(commentIdSchema, true),
    validate(commentSchema),
    authenticate,

    controller.updateComment
);
commentRouter.delete(
    '/comments/:commentId',

    validate(commentIdSchema, true),
    authenticate,

    controller.updateComment
);

export { commentRouter };