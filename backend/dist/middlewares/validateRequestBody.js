"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUpRequestBodyMiddleware = void 0;
const RequestBodyValidator_1 = __importDefault(require("../utils/RequestBodyValidator"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const requestBodyValidationMiddlewareFactoryFn = (validationMethod, customValidationErrorMessage) => {
    const middleware = (req, res, next) => {
        const validationErrors = validationMethod(req.body);
        if (Object.keys(validationErrors).length > 0) {
            // TODO: Replace hardcoded message with appropriate message from messages folder
            return next(new ErrorHandler_1.BadRequestError(customValidationErrorMessage ?? 'Validation failed!', validationErrors));
        }
        return next();
    };
    return middleware;
};
exports.validateSignUpRequestBodyMiddleware = requestBodyValidationMiddlewareFactoryFn(RequestBodyValidator_1.default.validateSignUpRequestBody, 'Invalid user input, please try again.');
