"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ERRORS = {
    requestBodyValidationFailed: 'Request body validation failed!',
    invalidUserInputPleaseTryAgain: 'Invalid user input, please try again.',
    authenticationFailedInvalidEmailOrPassword: 'Authentication failed! Invalid e-mail address or password.',
    anUnexpectedErrorOccured: 'An unexpected error occured!',
    unauthorizedUser: 'Unauthorized user.',
    invalidJWTProvided: 'Invalid JWT provided.',
    expiredJWTProvided: 'Expired JWT provided.'
};
exports.default = ERRORS;
