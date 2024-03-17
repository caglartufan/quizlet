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

        if(!validationErrors) {
            return next();
        } else {
            return next(
                new BadRequestError<TransformedError>(
                    customValidationErrorMessage ??
                        ERRORS.requestBodyValidationFailed,
                    validationErrors
                )
            );
        }
    };

    return middleware;
};

export const validateSignUpRequestBodyMiddleware =
    requestBodyValidationMiddlewareFactoryFn(
        RequestBodyValidator.validateSignUpRequestBody,
        ERRORS.invalidUserInputPleaseTryAgain
    );

export const validateSignInRequestBodyMiddleware =
    requestBodyValidationMiddlewareFactoryFn(
        RequestBodyValidator.validateSignInRequestBody,
        ERRORS.invalidUserInputPleaseTryAgain
    );

export const validateCreateQuizRequestBodyMiddleware =
    requestBodyValidationMiddlewareFactoryFn(
        RequestBodyValidator.validateCreateQuizRequestBody,
        ERRORS.invalidQuizInput
    );
