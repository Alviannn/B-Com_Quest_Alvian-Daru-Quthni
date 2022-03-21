import { NextFunction, Request, Response } from 'express';
import { Errors, sendResponse } from '../utils/api.util';
import { Roles } from '../entities/user.entity';
import { UserPayload } from './authenticate.middleware';

/**
 * Checks the user's permission
 *
 * NOTE: This requires the `authenticate` middleware
 *       to work properly.
 */
function permission(...roles: Roles[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body.payload as UserPayload | undefined;

        if (!payload || !roles.includes(payload.role)) {
            return sendResponse(res, Errors.NO_PERMISSION_ERROR);
        }

        return next();
    };
}

export default permission;