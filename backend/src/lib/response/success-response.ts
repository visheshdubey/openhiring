import { NextFunction, Request, Response } from 'express';

import { FormattedResponse } from './response.types';

const formatResponse = (resData: any): FormattedResponse => {
    if (resData.pagination) {
        const { pagination, ...data } = resData;
        return {
            status: 'success',
            data: data.data,
            ...pagination,
        };
    } else {
        return {
            status: 'success',
            data: resData,
        };
    }
};

export const handleFormatResponse = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;

    res.json = function (resData: any): Response<any, Record<string, any>> {
        const formattedData = formatResponse(resData);
        return originalJson.call(this, formattedData) as Response<any, Record<string, any>>;
    };
    (res as any).originalJson = originalJson;
    next();
};
