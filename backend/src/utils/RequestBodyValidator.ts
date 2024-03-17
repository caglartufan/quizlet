import Joi, { ValidationError } from 'joi';
import VALIDATION from '../messages/validation';

export type TransformedError = {
    [field: string]: TransformedError | string;
};

export type ValidationMethod = (body: object) => TransformedError | undefined;

export default class RequestBodyValidator {
    static readonly validateSignUpRequestBody: ValidationMethod = (body) => {
        const schema = Joi.object({
            firstname: Joi.string()
                .required()
                .max(50)
                .messages(VALIDATION.user.firstname),
            lastname: Joi.string()
                .required()
                .max(50)
                .messages(VALIDATION.user.lastname),
            email: Joi.string()
                .required()
                .email()
                .messages(VALIDATION.user.email),
            password: Joi.string()
                .required()
                .min(5)
                .max(100)
                .messages(VALIDATION.user.password),
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

    static readonly validateSignInRequestBody: ValidationMethod = (body) => {
        const schema = Joi.object({
            email: Joi.string()
                .required()
                .email()
                .messages(VALIDATION.user.email),
            password: Joi.string()
                .required()
                .min(5)
                .max(100)
                .messages(VALIDATION.user.password),
        });

        const { error } = schema.validate(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        // TODO: This transformation can be handled by a decorator function such as @TransformError
        return this.transformError(error);
    };

    static readonly validateCreateQuizRequestBody: ValidationMethod = (
        body
    ) => {
        const schema = Joi.object({
            title: Joi.string()
                .required()
                .min(5)
                .max(50)
                .messages(VALIDATION.quiz.title),
            description: Joi.string()
                .required()
                .min(5)
                .max(250)
                .messages(VALIDATION.quiz.description),
            askedInformation: Joi.object({
                firstname: Joi.boolean().required(),
                lastname: Joi.boolean().required(),
                age: Joi.boolean().required(),
                email: Joi.boolean().required(),
                address: Joi.boolean().required(),
                phone: Joi.boolean().required(),
            }).required(),
        });

        const { error } = schema.validate(body, {
            abortEarly: false,
            stripUnknown: true
        });

        // TODO: This transformation can be handled by a decorator function such as @TransformError
        return this.transformError(error);
    };

    private static transformError(error: ValidationError | undefined) {
        const transformedError: TransformedError = {};

        if (!error) {
            return;
        }

        error.details.forEach(detail => {
            let currentError = transformedError;
            detail.path.forEach((nestedPath, index) => {
                if(index === detail.path.length - 1) {
                    currentError[nestedPath] = detail.message;
                } else {
                    currentError[nestedPath] ??= {};
                    currentError = currentError[nestedPath] as TransformedError;
                }
            });
        });

        return transformedError;
    }

    private constructor() {}
}
