"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VALIDATION = {
    user: {
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
    },
    quiz: {
        title: {
            'any.required': 'Title was not entered.',
            'string.min': 'Title must contain at least 5 and at most 50 characters.',
            'string.max': 'Title must contain at least 5 and at most 50 characters.'
        },
        description: {
            'any.required': 'Description was not entered.',
            'string.min': 'Description must contain at least 5 and at most 250 characters.',
            'string.max': 'Description must contain at least 5 and at most 250 characters.'
        },
        isPublished: {
            'validate.message': 'Quiz can not be published without any questions added.'
        }
    },
    question: {
        description: {
            'any.required': 'Question description was not entered.',
            'string.min': 'Question description must contain at least 5 and at most 100 characters.',
            'string.max': 'Question description must contain at least 5 and at most 100 characters.'
        },
        options: {
            elem: {
                description: {
                    'any.required': 'Option description was not entered.',
                    'string.max': 'Option description must contain less than or equal to 50 chacters.'
                }
            }
        },
        correctOption: {
            'validate.message': 'Selected option does not exist.'
        }
    }
};
exports.default = VALIDATION;
