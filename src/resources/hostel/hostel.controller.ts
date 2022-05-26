import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../utility/appError.js';
import { catchAsync } from '../../utility/catchAsync.js';
import { createOne, getAll, getOne, updateOne } from '../../utility/factory.js';
import hostelModel from './hostel.model.js';

export const getAllHostels = getAll(hostelModel);
export const getHostelBuyId = getOne(hostelModel);
export const createHostel = createOne(hostelModel);
export const updateHostel = updateOne(hostelModel);

export const getHostelBuyAdminId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const hostel = await hostelModel.find({ _id: req.params.id });
        // .populate({ path: 'member' });

        if (!hostel) {
            return next(new AppError('No Hostel found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: hostel,
            },
        });
    }
);
