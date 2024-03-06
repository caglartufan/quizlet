import { RequestHandler } from 'express';
import RequestBodyValidator, {
    TransformedError,
    ValidationMethod,
} from '../utils/RequestBodyValidator';
import { BadRequestError } from '../utils/ErrorHandler';

const requestBodyValidationMiddlewareFactoryFn = (
    validationMethod: ValidationMethod,
    customValidationErrorMessage?: string
) => {
    const middleware: RequestHandler = (req, res, next) => {
        const validationErrors = validationMethod(req.body);

        if (Object.keys(validationErrors).length > 0) {
            // TODO: Replace hardcoded message with appropriate message from messages folder
            return next(
                new BadRequestError<TransformedError>(
                    customValidationErrorMessage ?? 'Validation failed!',
                    validationErrors
                )
            );
        }

        return next();
    };

    return middleware;
};

export const validateSignUpRequestBodyMiddleware =
    requestBodyValidationMiddlewareFactoryFn(
        RequestBodyValidator.validateSignUpRequestBody,
        'Invalid user input, please try again.'
    );
