import joi, { ObjectSchema } from 'joi';

export type CommentType = {
    content: string
}

export type UpdateCommentType = {
    content?: string
}

export type CommentIdType = {
    comment: string
}

export const commentSchema = joi.object({
    content: joi.string()
        .max(500)
        .required()
}) as ObjectSchema<CommentType>;

export const updateCommentSchema = joi.object({
    content: joi.string()
        .max(500)
}) as ObjectSchema<UpdateCommentType>;

export const commentIdSchema = joi.object({
    commentId: joi.number()
        .min(1)
        .required()
});