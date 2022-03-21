import joi, { ObjectSchema } from 'joi';

export type CommentType = {
    articleId: number,
    content: string
}

export type CommentIdType = {
    commentId: string
}

export const commentSchema = joi.object({
    articleId: joi.number()
        .min(1)
        .required(),

    content: joi.string()
        .max(500)
        .required()
}) as ObjectSchema<CommentType>;

export const commentIdSchema = joi.object({
    commentId: joi.number()
        .min(1)
        .required()
});