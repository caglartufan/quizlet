import { RequestHandler } from 'express';
import { IUser } from '../../models/User';

export const createQuiz: RequestHandler<
    {},
    any,
    {
        title: string;
        description: string;
        askedInformation: {
            firstname: boolean;
            lastname: boolean;
            age: boolean;
            email: boolean;
            address: boolean;
            phone: boolean;
        }
    },
    {},
    {
        user: IUser
    }
> = async (req, res, next) => {
    res.json({
        user: res.locals.user,
        body: req.body
    });
}