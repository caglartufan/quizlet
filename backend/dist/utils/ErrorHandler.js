"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.AuthenticationFailedError = exports.BadRequestError = exports.ExpiredJWTError = exports.InvalidJWTError = exports.UnauthorizedError = exports.HTTPError = void 0;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../models/User");
const errors_1 = __importDefault(require("../messages/errors"));
const validation_1 = __importDefault(require("../messages/validation"));
class HTTPError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.name = 'HTTPError';
        this.statusCode = statusCode;
    }
}
exports.HTTPError = HTTPError;
class UnauthorizedError extends HTTPError {
    constructor() {
        super(401, errors_1.default.unauthorizedUser);
        this.name = 'UnauthorizedError';
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InvalidJWTError extends HTTPError {
    constructor() {
        super(401, errors_1.default.invalidJWTProvided);
        this.name = 'InvalidJWTError';
    }
}
exports.InvalidJWTError = InvalidJWTError;
class ExpiredJWTError extends HTTPError {
    constructor() {
        super(401, errors_1.default.expiredJWTProvided);
        this.name = 'ExpiredJWTError';
    }
}
exports.ExpiredJWTError = ExpiredJWTError;
class BadRequestError extends HTTPError {
    errors;
    constructor(message, errors) {
        super(400, message);
        this.name = 'BadRequestError';
        this.errors = errors;
    }
}
exports.BadRequestError = BadRequestError;
class AuthenticationFailedError extends BadRequestError {
    constructor() {
        super(errors_1.default.authenticationFailedInvalidEmailOrPassword);
        this.name = 'AuthenticationFailedError';
    }
}
exports.AuthenticationFailedError = AuthenticationFailedError;
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
        if (error instanceof mongodb_1.MongoServerError) {
            return this.handleMongoServerError(error);
        }
        else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return new InvalidJWTError();
        }
        else if (error instanceof ExpiredJWTError) {
            return new ExpiredJWTError();
        }
        else if (error instanceof HTTPError) {
            return error;
        }
        else {
            return new InternalServerError(error.message);
        }
    }
    static handleMongoServerError(error) {
        if (error.code !== 11000) {
            return new InternalServerError(error.message);
        }
        const dbName = config_1.default.get('mongoDB.dbName');
        const collectionRegExp = new RegExp(`${dbName}\\.(\\w+)`);
        const collectionMatch = collectionRegExp.exec(error.message);
        const fieldAndValueMatch = /{ (.+): "(.*)" }/.exec(error.message);
        const defaultError = new BadRequestError('One of the entered inputs is already in use, please try a different input.');
        if (collectionMatch === null || fieldAndValueMatch === null) {
            return defaultError;
        }
        const collection = collectionMatch[1];
        const field = fieldAndValueMatch[1];
        const value = fieldAndValueMatch[2];
        if (collection === User_1.User.collection.name && field === 'email') {
            const transformedError = {
                email: validation_1.default.user.email['unique'],
            };
            return new BadRequestError(errors_1.default.invalidUserInputPleaseTryAgain, transformedError);
        }
        else {
            return defaultError;
        }
    }
}
exports.default = ErrorHandler;
