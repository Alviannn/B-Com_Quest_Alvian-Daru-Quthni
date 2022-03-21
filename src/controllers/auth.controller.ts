import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../configs/config';

import { Request, Response } from 'express';
import { LoginType, RegisterType } from '../validations/user.validation';
import { User } from '../entities/user.entity';
import { sendResponse, Errors } from '../utils/api.util';
import { StatusCodes } from 'http-status-codes';
import { UserPayload } from '../middlewares/authenticate.middleware';

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
    user.password = await bcrypt.hash(body.password, config.hashRounds);

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

    const payload: UserPayload = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role
    };

    const accessToken = jwt.sign(
        payload,
        config.jwt.accessSecret,
        {
            expiresIn: config.jwt.accessSecret,
            notBefore: config.jwt.notBefore
        });

    return sendResponse(res, {
        message: 'Successfully logged in as user',
        data: {
            accessToken
        }
    });
}

export { login, register };