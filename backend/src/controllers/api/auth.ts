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

    let userDTO = new UserDTO(
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        req.body.email,
        req.body.password
    );

    try {
        const user = await services.userService.signUpUser(userDTO);

        const token = await user.generateAuthToken();

        userDTO = UserDTO.withUserDocument(user);

        return res
            .status(201)
            .header('Authorization', 'Bearer ' + token)
            .json({
                ok: true,
                user: userDTO.toObject(),
            });
    } catch (err) {
        next(ErrorHandler.handle(err));
    }
};

export const signIn: RequestHandler = (req, res, next) => {
    // Will be added
};
