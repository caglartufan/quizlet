"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validation_1 = __importDefault(require("../messages/validation"));
class RequestBodyValidator {
    static validateSignUpRequestBody = (body) => {
        const schema = joi_1.default.object({
            firstname: joi_1.default.string()
                .required()
                .max(50)
                .messages(validation_1.default.user.firstname),
            lastname: joi_1.default.string().required().max(50).messages(validation_1.default.user.lastname),
            email: joi_1.default.string().required().email().messages(validation_1.default.user.email),
            password: joi_1.default.string().required().min(5).max(100).messages(validation_1.default.user.password),
            passwordConfirm: joi_1.default.any()
                .required()
                .equal(joi_1.default.ref('password'))
                .messages(validation_1.default.user.passwordConfirmation),
        });
        const { error } = schema.validate(body, {
            abortEarly: false,
            stripUnknown: true,
        });
        // TODO: This transformation can be handled by a decorator function such as @TransformError
        return this.transformError(error);
    };
    static validateSignInRequestBody = (body) => {
        const schema = joi_1.default.object({
            email: joi_1.default.string().required().email().messages(validation_1.default.user.email),
            password: joi_1.default.string().required().min(5).max(100).messages(validation_1.default.user.password)
        });
        const { error } = schema.validate(body, {
            abortEarly: false,
            stripUnknown: true,
        });
        // TODO: This transformation can be handled by a decorator function such as @TransformError
        return this.transformError(error);
    };
    static transformError(error) {
        const transformedError = {};
        if (typeof error === 'undefined') {
            return transformedError;
        }
        for (const detail of error.details) {
            transformedError[detail.path[0]] = detail.message;
        }
        return transformedError;
    }
    constructor() { }
}
exports.default = RequestBodyValidator;
