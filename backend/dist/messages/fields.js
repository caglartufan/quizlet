"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FIELDS = {
    firstname: {
        'any.required': 'First name was not entered.',
        'string.max': 'First name can contain maximum of 50 characters.',
    },
    lastname: {
        'any.required': 'Last name was not entered.',
        'string.max': 'Last name can contain maximum of 50 characters.',
    },
    email: {
        'any.required': 'E-mail address was not entered.',
        'string.email': 'E-mail address is not a valid e-mail address.',
        'unique': 'E-mail address is already in use.'
    },
    password: {
        'any.required': 'Password was not entered.',
        'string.min': 'Password must be at least 5 characters long.',
        'string.max': 'Password must contain less than 1024 characters.',
    },
    passwordConfirmation: {
        'any.required': 'Password confirmation was not entered.',
        'any.only': 'Password and password confirmation does not match.',
    },
    countryCode: {
        'string.pattern.base': 'Country is not valid.',
    },
};
exports.default = FIELDS;
