import { Request, Response } from 'express';
import { Article } from '../entities/article.entity';
import { ArticleType } from '../validations/article.validation';
import { Errors, sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';

async function addArticle(req: Request, res: Response) {
    delete req.body.payload;
    const body = req.body as ArticleType;

    const article = Article.create({ ...body });
    try {
        await Article.save(article);

        return sendResponse(res, {
            message: 'Successfully created a new article',
            statusCode: StatusCodes.CREATED,
            data: { articleId: article.id }
        });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

async function readArticle(req: Request, res: Response) {
    const { articleId } = req.params;

    try {
        const article = await Article.findOne({
            where: {
                id: parseInt(articleId)
            }
        });

        if (!article) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Cannot find article'
            });
        }

        return sendResponse(res, {
            message: 'Found article',
            data: { article }
        });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

async function updateArticle(req: Request, res: Response) {
    delete req.body.payload;

    const { articleId } = req.params;
    const body = req.body as ArticleType;

    try {
        const article = await Article.findOne({
            where: {
                id: parseInt(articleId)
            }
        });

        if (!article) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Cannot find article'
            });
        }

        article.title = body.title;
        article.content = body.content;

        await Article.save(article);
        return sendResponse(res, { message: 'Updated article' });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

async function deleteArticle(req: Request, res: Response) {
    const { articleId } = req.params;

    try {
        const article = await Article.findOne({
            where: {
                id: parseInt(articleId)
            }
        });

        if (!article) {
            return sendResponse(res, {
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Cannot find article'
            });
        }

        await Article.delete(article);

        return sendResponse(res, { message: 'Deleted article' });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

export { addArticle, readArticle, updateArticle, deleteArticle };