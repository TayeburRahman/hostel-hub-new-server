import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../utility/appError.js';
import { catchAsync } from '../../utility/catchAsync.js';
import { createOne, getAll, updateOne } from '../../utility/factory.js';
import hostelBookingModel from './hostelBooking.model.js';

export const getAllHostelBooking = getAll(hostelBookingModel, {
    path: 'userId',
});

export const createHostelBooking = createOne(hostelBookingModel);
export const updateHostelBooking = updateOne(hostelBookingModel);

export const getHostelBookingBuyId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const doc = await hostelBookingModel
            .findById(req.params.id)
            .populate({ path: 'addId' })
            .populate({ path: 'userId', select: 'name email img role' });

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    }
);
