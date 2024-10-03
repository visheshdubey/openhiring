import { HttpStatus, NetworkException, ValidateRequestException } from '@/lib/response/error-response';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import { validationResult } from 'express-validator';

export const handleNetworkErrorResponse = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof NetworkException) {
        return (res.status(err.status) as any).originalJson({
            status: 'error',
            message: err.custom_message || err.message,
            error_type: err.name,
        });
    }

    console.error(err);

    // Handle other errors
    return (res.status(HttpStatus.InternalServerError.code) as any).originalJson({
        status: 'error',
        message: err,
        error_type: 'InternalServerError',
    });
};

export const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        const validationError = new ValidateRequestException(errors.array());
        return (response.status(HttpStatus.BadRequest.code) as any).originalJson({
            status: 'error',
            message: validationError,
            error_type: validationError.name,
        });
    }

    next();
};