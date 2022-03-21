import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Request, Response } from 'express';
import { LoginType, RegisterType } from '../validations/user.validation';
import { User } from '../entities/user.entity';
import { sendResponse, Errors } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';

const HASH_ROUNDS = 12;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const ACCESS_EXPIRE = process.env.JWT_EXPIRE_TIME!;

async function register(req: Request, res: Response) {
    const body = req.body as RegisterType;

    try {
        const foundUser = await User.findOne({ where: { email: body.email } });
        if (foundUser) {
            return sendResponse(res, {
                statusCode: StatusCodes.BAD_REQUEST,
                success: false,
                message: 'This account is already registered'
            });
        }
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }

    const user = User.create({ ...body });
    user.password = await bcrypt.hash(body.password, HASH_ROUNDS);

    try {
        await User.save(user);

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            message: 'Successfully registered your account'
        });
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }
}

async function login(req: Request, res: Response) {
    const body = req.body as LoginType;
    let foundUser: User | undefined;

    try {
        foundUser = await User.findOne({
            where: {
                username: body.username
            }
        });

        if (!foundUser) {
            return sendResponse(res, {
                statusCode: StatusCodes.BAD_REQUEST,
                success: false,
                message: 'This account is not registered'
            });
        }
    } catch (err) {
        return sendResponse(res, Errors.SERVER_ERROR);
    }

    const isPasswordValid = await bcrypt.compare(
        body.password,
        foundUser.password);

    if (!isPasswordValid) {
        return sendResponse(res, {
            statusCode: StatusCodes.BAD_REQUEST,
            success: false,
            message: 'Incorrect password'
        });
    }

    const accessToken = jwt.sign(
        {
            sub: foundUser.id,
            username: foundUser.username
        },
        ACCESS_SECRET,
        {
            expiresIn: ACCESS_EXPIRE
        });

    return sendResponse(res, {
        message: 'Successfully logged in as user',
        data: {
            accessToken
        }
    });
}

export { login, register };