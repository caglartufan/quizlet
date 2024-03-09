import { MongoServerError } from 'mongodb';
import config from 'config';
import { User } from '../models/User';
import ERRORS from '../messages/errors';
import FIELDS from '../messages/fields';
import { TransformedError } from './RequestBodyValidator';

export class HTTPError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        this.name = 'HTTPError';
        this.statusCode = statusCode;
    }
}

export class BadRequestError<T> extends HTTPError {
    public errors?: T;

    constructor(message: string, errors?: T) {
        super(400, message);

        this.name = 'BadRequestError';
        this.errors = errors;
    }
}

export class InternalServerError extends HTTPError {
    constructor(message?: string) {
        let newMessage = ERRORS.anUnexpectedErrorOccured;
        if (message) {
            newMessage += ' ' + message;
        }
        super(500, newMessage);

        this.name = 'InternalServerError';
    }
}

export default class ErrorHandler {
    static handle(error: any) {
        if (error instanceof MongoServerError) {
            return this.handleMongoServerError(error);
        } else if (error instanceof HTTPError) {
            return error;
        } else {
            return new InternalServerError(error.message);
        }
    }

    private static handleMongoServerError(error: MongoServerError) {
        if(error.code !== 11000) {
            return new InternalServerError(error.message);
        }

        const dbName = config.get('mongoDB.dbName');
        const collectionRegExp = new RegExp(`${dbName}\\.(\\w+)`);
        const collectionMatch = collectionRegExp.exec(error.message);
        const fieldAndValueMatch = /{ (.+): "(.*)" }/.exec(error.message);
        const defaultError = new BadRequestError(
            'One of the entered inputs is already in use, please try a different input.'
        );

        if (collectionMatch === null || fieldAndValueMatch === null) {
            return defaultError;
        }

        const collection = collectionMatch[1];
        const field = fieldAndValueMatch[1];
        const value = fieldAndValueMatch[2];

        if (
            collection === User.collection.name &&
            (field === 'username' || field === 'email')
        ) {
            const transformedError: TransformedError = {
                [field]: FIELDS[field]['unique'],
            };

            return new BadRequestError(
                ERRORS.invalidUserInputPleaseTryAgain,
                transformedError
            );
        } else {
            return defaultError;
        }
    }
}
