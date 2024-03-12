import { RequestHandler } from 'express';
import _ from 'lodash';
import ServiceRegistry from '../../services/ServiceRegistry';
import UserDTO from '../../DTO/UserDTO';
import ErrorHandler from '../../utils/ErrorHandler';

export const signUp: RequestHandler<
    {},
    any,
    {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
    }
> = async (req, res, next) => {
    const services = req.app.get('services') as ServiceRegistry;

    let userDTO = new UserDTO(req.body);

    try {
        const user = await services.userService.signUpUser(userDTO);

        const token = await user.getActiveAuthTokenOrGenerateOne();

        userDTO = new UserDTO(user);

        return res
            .status(201)
            .header('Authorization', 'Bearer ' + token)
            .json({
                ok: true,
                user: _.omit(userDTO.toObject(), ['_id', 'password', 'activeToken']),
            });
    } catch (err) {
        next(ErrorHandler.handle(err));
    }
};

export const signIn: RequestHandler<
    {},
    any,
    {
        email: string,
        password: string
    }
> = async (req, res, next) => {
    const services = req.app.get('services') as ServiceRegistry;

    let userDTO = new UserDTO(req.body);

    try {
        const user = await services.userService.signInUser(userDTO);

        const token = await user.getActiveAuthTokenOrGenerateOne();

        userDTO = new UserDTO(user);

        return res
            .header('Authorization', 'Bearer ' + token)
            .json({
                ok: true,
                user: _.omit(userDTO.toObject(), ['_id', 'password', 'activeToken'])
            });
    } catch(err) {
        next(ErrorHandler.handle(err));
    }
};
