"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateQuizRequestBodyMiddleware = exports.validateSignInRequestBodyMiddleware = exports.validateSignUpRequestBodyMiddleware = void 0;
const RequestBodyValidator_1 = __importDefault(require("../utils/RequestBodyValidator"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const errors_1 = __importDefault(require("../messages/errors"));
const requestBodyValidationMiddlewareFactoryFn = (validationMethod, customValidationErrorMessage) => {
    const middleware = (req, res, next) => {
        const validationErrors = validationMethod(req.body);
        if (!validationErrors) {
            return next();
        }
        else {
            return next(new ErrorHandler_1.BadRequestError(customValidationErrorMessage ??
                errors_1.default.requestBodyValidationFailed, validationErrors));
        }
    };
    return middleware;
};
exports.validateSignUpRequestBodyMiddleware = requestBodyValidationMiddlewareFactoryFn(RequestBodyValidator_1.default.validateSignUpRequestBody, errors_1.default.invalidUserInputPleaseTryAgain);
exports.validateSignInRequestBodyMiddleware = requestBodyValidationMiddlewareFactoryFn(RequestBodyValidator_1.default.validateSignInRequestBody, errors_1.default.invalidUserInputPleaseTryAgain);
exports.validateCreateQuizRequestBodyMiddleware = requestBodyValidationMiddlewareFactoryFn(RequestBodyValidator_1.default.validateCreateQuizRequestBody, errors_1.default.invalidQuizInput);
