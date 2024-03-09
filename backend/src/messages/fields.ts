const FIELDS = {
    firstname: {
        'any.required': 'First name was not entered.',
        'string.max': 'First name can contain maximum of 50 characters.',
    },
    lastname: {
        'any.required': 'Last name was not entered.',
        'string.max': 'Last name can contain maximum of 50 characters.',
    },
    username: {
        'any.required': 'User name was not entered.',
        'string.min':
            'User name can contain minimum of 3 and maximum of 20 characters.',
        'string.max':
            'User name can contain minimum of 3 and maximum of 20 characters.',
        'string.alphanum': 'User name must be alphanumeric.',
        'unique': 'User name is already in use.'
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

export default FIELDS;
