import { NextFunction, Request, Response } from 'express';

export const catchAsync = (fn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error: any) {
            next(error);
        }
    };
};
