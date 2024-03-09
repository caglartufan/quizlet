import Joi, { ValidationError } from 'joi';
import FIELDS from '../messages/fields';

export type TransformedError = {
    [field: string]: string;
};

export type ValidationMethod = (body: object) => TransformedError;

export default class RequestBodyValidator {
    static readonly validateSignUpRequestBody: ValidationMethod = (
        body: object
    ) => {
        const schema = Joi.object({
            firstname: Joi.string()
                .required()
                .max(50)
                .messages(FIELDS.firstname),
            lastname: Joi.string().required().max(50).messages(FIELDS.lastname),
            username: Joi.string()
                .required()
                .min(3)
                .max(20)
                .alphanum()
                .messages(FIELDS.username),
            email: Joi.string().required().email().messages(FIELDS.email),
            password: Joi.string().min(5).max(100).messages(FIELDS.password),
            passwordConfirm: Joi.any()
                .required()
                .equal(Joi.ref('password'))
                .messages(FIELDS.passwordConfirmation),
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
