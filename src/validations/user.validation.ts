import joi, { ObjectSchema } from 'joi';

const passwordSchema = joi.string()
    .min(8)
    .max(64)

    .regex(/[0-9]/)
    .rule({ message: '{#label} requires at least a number' })

    .regex(/[a-z]/)
    .rule({ message: '{#label} requires at least a lowercase character' })

    .regex(/[A-Z]/)
    .rule({ message: '{#label} requires at least an uppercase character' })

    .regex(/[^a-zA-Z\d]/)
    .rule({ message: '{#label} requires at least a special character' });

export type LoginType = {
    username: string,
    password: string
}

export type RegisterType = LoginType & {
    email: string
}

export const loginSchema = joi.object({
    username: joi.string()
        .max(64)
        .required(),

    password: passwordSchema
        .required()
}) as ObjectSchema<LoginType>;

export const registerSchema = loginSchema.append({
    email: joi.string()
        .max(64)
        .email()
        .required(),
}) as ObjectSchema<RegisterType>;