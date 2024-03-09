import { RequestHandler } from 'express';
import RequestBodyValidator, {
    TransformedError,
    ValidationMethod,
} from '../utils/RequestBodyValidator';
import { BadRequestError } from '../utils/ErrorHandler';
import ERRORS from '../messages/errors';

const requestBodyValidationMiddlewareFactoryFn = (
    validationMethod: ValidationMethod,
    customValidationErrorMessage?: string
) => {
    const middleware: RequestHandler = (req, res, next) => {
        const validationErrors = validationMethod(req.body);

        if (Object.keys(validationErrors).length > 0) {
            return next(
                new BadRequestError<TransformedError>(
                    customValidationErrorMessage ??
                        ERRORS.requestBodyValidationFailed,
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
        ERRORS.invalidUserInputPleaseTryAgain
    );
