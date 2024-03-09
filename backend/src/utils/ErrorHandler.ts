import ERRORS from "../messages/errors";

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
        if(message) {
            newMessage += ' ' + message;
        }
        super(500, newMessage);

        this.name = 'InternalServerError';
    }
}

export default class ErrorHandler {
    static handle(error: any) {
        if (error instanceof HTTPError) {
            return error;
        } else {
            return new InternalServerError(error.message);
        }
    }
}