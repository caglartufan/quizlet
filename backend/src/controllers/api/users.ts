import { RequestHandler } from 'express';

export const getUsers: RequestHandler = (req, res, next) => {
    res.json({
        users: []
    });
};
