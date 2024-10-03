import { HttpStatus } from '@/lib/error-codes-http';
import { ValidationError } from 'express-validator';

/**
 * Base class for network exceptions.
 */
class NetworkException extends Error {
    /**
     * HTTP status code of the exception.
     */
    status: number;

    /**
     * Additional custom message for the exception.
     */
    custom_message?: unknown;

    /**
     * Creates an instance of NetworkException.
     * @param message The error message.
     * @param status The HTTP status code (default: 400 Bad Request).
     * @param validation_error Additional validation error details (optional).
     */
    constructor(message: string, status?: number, validation_error?: unknown) {
        super(message);
        this.status = status || HttpStatus.BadRequest.code;
        this.custom_message = validation_error;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Exception for resources not found.
 */
class NotFoundException extends NetworkException {
    /**
     * Creates an instance of NotFoundException.
     * @param resource The resource name.
     */
    constructor(resource: string) {
        super(`${resource} not found`, HttpStatus.NotFound.code);
    }
}

/**
 * Exception for internal server errors.
 */
class InternalServerError extends NetworkException {
    /**
     * Creates an instance of InternalServerError.
     */
    constructor() {
        super(`Something went wrong!`, HttpStatus.InternalServerError.code);
    }
}

/**
 * Exception for bad requests.
 */
class BadRequestException extends NetworkException {
    /**
     * Creates an instance of BadRequestException.
     * @param resource The resource name.
     */
    constructor(resource: string) {
        super(`${resource}`, HttpStatus.BadRequest.code);
    }
}

/**
 * Exception for validation errors in request.
 */
class ValidateRequestException extends NetworkException {
    /**
     * Creates an instance of ValidateRequestException.
     * @param resource The validation errors array.
     */
    constructor(resource: ValidationError[]) {
        super('Validation errors in request', HttpStatus.BadRequest.code, resource);
    }
}

/**
 * Exception for forbidden access.
 */
class ForbiddenException extends NetworkException {
    /**
     * Creates an instance of ForbiddenException.
     * @param resource The resource name.
     */
    constructor(resource: string) {
        super(`${resource}`, 401);
    }
}

/**
 * Exception for unauthorized access.
 */
class UnauthorizedException extends NetworkException {
    /**
     * Creates an instance of UnauthorizedException.
     * @param resource The resource name (optional).
     */
    constructor(resource?: string) {
        super(resource || `Unauthorized access`, HttpStatus.Unauthorised.code);
    }
}

export {
    NetworkException,
    NotFoundException,
    ValidateRequestException,
    UnauthorizedException,
    BadRequestException,
    ForbiddenException,
    InternalServerError,
    HttpStatus
};