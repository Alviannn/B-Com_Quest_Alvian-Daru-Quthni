import { Request, Response } from 'express';
import { Article } from '../entities/article.entity';
import { ArticleType } from '../validations/article.validation';
import { Errors, sendResponse } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';
import { UserPayload } from '../middlewares/authenticate.middleware';
import { User } from '../entities/user.entity';
import { DateTime } from 'luxon';

async function addArticle(req: Request, res: Response) {
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

    delete req.body.payload;
    const body = req.body as ArticleType;

    const article = Article.create({ ...body, author });
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
            },
            relations: ['comments']
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
            data: { article: article.build() }
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
        article.updatedAt = DateTime.utc();

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

async function getAllArticle(_: Request, res: Response) {
    try {
        const articles = await Article.find({ relations: ['comments'] });

        return sendResponse(res, {
            message: 'Found article(s)',
            data: { articles: articles.map((article) => article.build()) }
        });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

export { addArticle, readArticle, updateArticle, deleteArticle, getAllArticle };