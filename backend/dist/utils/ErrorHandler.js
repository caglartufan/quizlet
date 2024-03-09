"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.BadRequestError = exports.HTTPError = void 0;
const errors_1 = __importDefault(require("../messages/errors"));
class HTTPError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.name = 'HTTPError';
        this.statusCode = statusCode;
    }
}
exports.HTTPError = HTTPError;
class BadRequestError extends HTTPError {
    errors;
    constructor(message, errors) {
        super(400, message);
        this.name = 'BadRequestError';
        this.errors = errors;
    }
}
exports.BadRequestError = BadRequestError;
class InternalServerError extends HTTPError {
    constructor(message) {
        let newMessage = errors_1.default.anUnexpectedErrorOccured;
        if (message) {
            newMessage += ' ' + message;
        }
        super(500, newMessage);
        this.name = 'InternalServerError';
    }
}
exports.InternalServerError = InternalServerError;
class ErrorHandler {
    static handle(error) {
        if (error instanceof HTTPError) {
            return error;
        }
        else {
            return new InternalServerError(error.message);
        }
    }
}
exports.default = ErrorHandler;
