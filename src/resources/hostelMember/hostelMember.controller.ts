import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utility/catchAsync.js';
import { deleteOne, getAll } from '../../utility/factory.js';
import userModel from '../auth/auth.model.js';
import hostelBookingModel from '../hostelBooking/hostelBooking.model.js';
import hostelMemberModel from './hostelMemberModel.model.js';

export const getAllHostelMember = getAll(hostelMemberModel);
export const rejectHostelMemberRequest = deleteOne(hostelMemberModel);

export const acceptHostelBookingRequest = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const hostelId = req.body.hostelId;
        const userId = req.body.userId;

        await hostelMemberModel.create({ hostelId, userId });
        await hostelBookingModel.deleteMany({ userId });
        await userModel.findByIdAndUpdate(userId, { role: 'member' });

        res.status(200).json({
            status: 'success',
            data: 'The user successfully added to your hostel.',
        });
    }
);
