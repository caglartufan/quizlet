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
    constructor(message: string) {
        super(500, 'An unexpected error occured! ' + message);

        this.name = 'InternalServerError';
    }
}

export default class ErrorHandler {
    static handle(error: Error) {
        if (error instanceof HTTPError) {
            return error;
        } else {
            return new InternalServerError(error.message);
        }
    }
}