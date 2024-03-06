import { RequestHandler } from 'express';
import { User } from '../../models/User';
import RequestBodyValidator from '../../utils/RequestBodyValidator';

export const signUp: RequestHandler = async (req, res, next) => {
    // TODO: Validation process into middleware and implement better error handling logic
    const validationErrors = RequestBodyValidator.validateSignUpRequestBody(req.body);

    if(Object.keys(validationErrors).length > 0) {
        return res.status(400).json({
            ok: false,
            errors: validationErrors
        });
    }

    const user = new User(req.body);
    await user.save();

    res.json({
        body: req.body,
        user: user
    });
};

export const signIn: RequestHandler = (req, res, next) => {

}