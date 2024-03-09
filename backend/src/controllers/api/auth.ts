import { RequestHandler } from 'express';
import ServiceRegistry from '../../services/ServiceRegistry';
import UserDTO from '../../DTO/UserDTO';
import ErrorHandler from '../../utils/ErrorHandler';

export const signUp: RequestHandler<
    {},
    any,
    {
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        password: string;
    }
> = async (req, res, next) => {
    const services = req.app.get('services') as ServiceRegistry;

    const userDTO = new UserDTO(
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        req.body.email,
        req.body.password
    );

    try {
        const user = await services.userService.signUpUser(userDTO);

        res.json({
            body: req.body,
            user: user,
        });
    } catch (err) {
        next(ErrorHandler.handle(err));
    }
};

export const signIn: RequestHandler = (req, res, next) => {
    // Will be added
};
