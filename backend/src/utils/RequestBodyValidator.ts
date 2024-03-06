import Joi, { ValidationError } from 'joi';

type TransformedError = {
    [field: string]: string;
};

export default class RequestBodyValidator {
    static validateSignUpRequestBody(body: object) {
        const schema = Joi.object({
            firstname: Joi.string().required().max(50),
            lastname: Joi.string().required().max(50),
            username: Joi.string().required().min(3).max(20).alphanum(),
            email: Joi.string().required().email(),
            password: Joi.string().min(5).max(100),
            passwordConfirm: Joi.any().equal(Joi.ref('password')).required(),
        });

        const { error } = schema.validate(body, { abortEarly: false });

        return this.transformError(error);
    }

    private static transformError(error: ValidationError | undefined) {
        const transformedError: TransformedError = {};

        if(typeof error === 'undefined') {
            return transformedError;
        }

        for (const detail of error.details) {
            transformedError[detail.path[0]] = detail.message;
        }

        return transformedError;
    }

    private constructor() {}
}
