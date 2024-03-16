import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import ErrorHandler, { UnauthorizedError } from '../utils/ErrorHandler';
import UserDAO from '../DAO/UserDAO';
import { IUser } from '../models/User';

const auth: RequestHandler<{}, any, any, {}, { user: IUser }> = async (req, res, next) => {
    const unauthorizedError = new UnauthorizedError();
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if(typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7, authHeader.length);
    }

    if(typeof token === 'undefined') {
        return next(unauthorizedError);
    }

    try {
        const payload = jwt.verify(token, config.get<string>('jwt.privateKey')) as { email: string };

        const user = await UserDAO.findUserWithGivenEmail(payload.email);

        if(!user) {
            return next(unauthorizedError);
        }

        res.locals.user = user;

        return next();
    } catch(err) {
        return next(ErrorHandler.handle(err));
    }
};

export default auth;