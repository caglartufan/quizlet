import Joi, { ValidationError } from 'joi';
import VALIDATION from '../messages/validation';

export type TransformedError = {
    [field: string]: string;
};

export type ValidationMethod = (body: object) => TransformedError;

export default class RequestBodyValidator {
    static readonly validateSignUpRequestBody: ValidationMethod = (
        body
    ) => {
        const schema = Joi.object({
            firstname: Joi.string()
                .required()
                .max(50)
                .messages(VALIDATION.user.firstname),
            lastname: Joi.string().required().max(50).messages(VALIDATION.user.lastname),
            email: Joi.string().required().email().messages(VALIDATION.user.email),
            password: Joi.string().required().min(5).max(100).messages(VALIDATION.user.password),
            passwordConfirm: Joi.any()
                .required()
                .equal(Joi.ref('password'))
                .messages(VALIDATION.user.passwordConfirmation),
        });

        const { error } = schema.validate(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        // TODO: This transformation can be handled by a decorator function such as @TransformError
        return this.transformError(error);
    };

    static readonly validateSignInRequestBody: ValidationMethod = (
        body
    ) => {
        const schema = Joi.object({
            email: Joi.string().required().email().messages(VALIDATION.user.email),
            password: Joi.string().required().min(5).max(100).messages(VALIDATION.user.password)
        });

        const { error } = schema.validate(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        // TODO: This transformation can be handled by a decorator function such as @TransformError
        return this.transformError(error);
    };

    private static transformError(error: ValidationError | undefined) {
        const transformedError: TransformedError = {};

        if (typeof error === 'undefined') {
            return transformedError;
        }

        for (const detail of error.details) {
            transformedError[detail.path[0]] = detail.message;
        }

        return transformedError;
    }

    private constructor() {}
}
