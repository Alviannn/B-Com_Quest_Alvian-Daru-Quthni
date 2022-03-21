import { Request, Response } from 'express';
import { Errors, sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';
import { CommentIdType, CommentType } from '../validations/comment.validation';
import { Comment } from '../entities/comment.entity';
import { Article } from '../entities/article.entity';
import { Roles, User } from '../entities/user.entity';
import { UserPayload } from '../middlewares/authenticate.middleware';

async function fetchArticle(req: Request) {
    const { articleId } = req.params;
    const article = await Article.findOne({ where: { id: articleId } });

    if (!article) {
        throw Error();
    }

    return article;
}

async function addComment(req: Request, res: Response) {
    const payload = req.body.payload as UserPayload;
    let author: User | undefined;

    try {
        author = await User.findOne({ where: { id: payload.id } });
        if (!author) {
            return sendResponse(res, Errors.NO_SESSION_ERROR);
        }
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }

    let article: Article;
    try {
        article = await fetchArticle(req);
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }

    delete req.body.payload;

    const body = req.body as CommentType;
    const comment = Comment.create({ ...body, author, article });

    try {
        await Comment.save(comment);

        return sendResponse(res, {
            message: 'Successfully created a new comment to article',
            statusCode: StatusCodes.CREATED,
            data: { commentId: comment.id }
        });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

async function updateComment(req: Request, res: Response) {
    const { commentId } = req.params as CommentIdType;
    const body = req.body as CommentType;

    try {
        const comment = await Comment.findOne({
            where: {
                id: parseInt(commentId)
            }
        });

        if (!comment) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Cannot find comment'
            });
        }

        comment.content = body.content;
        await Comment.save(comment);

        return sendResponse(res, {
            message: 'Updated comment'
        });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

async function deleteComment(req: Request, res: Response) {
    const payload = req.body.payload as UserPayload;

    delete req.body.payload;
    const { commentId } = req.params as CommentIdType;

    try {
        const comment = await Comment.findOne({
            relations: ['users'],
            where: {
                id: parseInt(commentId)
            }
        });

        if (!comment) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Cannot find comment'
            });
        }

        const isAuthor = comment.author.id === payload.id;
        const isAdmin = payload.role === Roles.ADMIN;

        if (isAuthor || isAdmin) {
            return sendResponse(res, Errors.NO_PERMISSION_ERROR);
        }

        await Comment.delete(comment);

        return sendResponse(res, { message: 'Deleted comment' });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

export { addComment, deleteComment, updateComment };