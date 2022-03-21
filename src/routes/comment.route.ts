import * as controller from '../controllers/comment.controller';
import validate from '../middlewares/validate.middleware';
import authenticate from '../middlewares/authenticate.middleware';

import { Router } from 'express';
import {
    commentIdSchema,
    commentSchema
} from '../validations/comment.validation';

const commentRouter = Router();

commentRouter.get(
    '/:commentId',
    validate(commentIdSchema, true),

    controller.readComment
);
commentRouter.post(
    '/',

    validate(commentSchema),
    authenticate,

    controller.addComment
);
commentRouter.put(
    '/:commentId',

    validate(commentIdSchema, true),
    validate(commentSchema),
    authenticate,

    controller.updateComment
);
commentRouter.delete(
    '/:commentId',

    validate(commentIdSchema, true),
    authenticate,

    controller.updateComment
);

export { commentRouter };