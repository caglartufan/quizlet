"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.BadRequestError = exports.HTTPError = void 0;
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
        super(500, 'An unexpected error occured! ' + message);
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
