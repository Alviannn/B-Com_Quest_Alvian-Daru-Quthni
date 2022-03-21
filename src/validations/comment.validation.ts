import joi, { ObjectSchema } from 'joi';

export type CommentType = {
    content: string
}

export type UpdateCommentType = {
    content?: string
}

export type CommentIdType = {
    articleId: string,
    commentId: string
}

export const commentSchema = joi.object({
    content: joi.string()
        .max(500)
        .required()
}) as ObjectSchema<CommentType>;

export const commentIdSchema = joi.object({
    articleId: joi.number()
        .min(1)
        .required(),

    commentId: joi.number()
        .min(1)
        .required()
});