import joi, { ObjectSchema } from 'joi';

export type ArticleType = {
    title: string,
    content: string
}

export type ArticleIdType = {
    articleId: string
}

export const articleSchema = joi.object({
    title: joi.string()
        .max(128)
        .required(),

    content: joi.string()
        .max(2_000)
        .required()
}) as ObjectSchema<ArticleType>;

export const articleIdSchema = joi.object({
    articleId: joi.number()
        .min(1)
        .required()
});