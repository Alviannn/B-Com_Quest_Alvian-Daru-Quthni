import jwt from 'jsonwebtoken';
import config from '../configs/config';

import { NextFunction, Request, Response } from 'express';
import { Errors, sendResponse } from '../utils/api.util';
import { Roles } from '../entities/user.entity';

function authenticate(req: Request, res: Response, next: NextFunction) {
    const prefix = 'Bearer ';
    const rawToken = req.header('authorization');

    if (!rawToken || !rawToken.startsWith(prefix)) {
        return sendResponse(res, Errors.NO_SESSION_ERROR);
    }

    const token = rawToken.replace(prefix, '');
    try {
        // need a way to get the payload easily
        const userPayload = jwt.verify(token, config.jwt.accessSecret);
        req.body.payload = userPayload;

        return next();
    } catch (err) {
        return sendResponse(res, Errors.NO_SESSION_ERROR);
    }
}

export type UserPayload = {
    id: number,
    username: string,
    role: Roles
}

export default authenticate;