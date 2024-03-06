import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const signUp: RequestHandler = async (req, res, next) => {
    const user = new User(req.body);
    await user.save();

    res.json({
        body: req.body,
        user: user,
    });
};

export const signIn: RequestHandler = (req, res, next) => {
    // Will be added
};
