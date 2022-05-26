import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../utility/appError.js';
import { catchAsync } from '../../utility/catchAsync.js';
import UserModel from './auth.model.js';

export const signUp = catchAsync(async (req: Request, res: Response) => {
    const ExistingUser = await UserModel.findOne({
        email: req.body.email,
    })
        .populate({
            path: 'store',
        })
        .populate({ path: 'hostel' });

    if (ExistingUser) {
        return res.json({ user: ExistingUser });
    }

    const user = await UserModel.create(req.body);

    return res.json({ user });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const email = req.decodedEmail;

    const user = await UserModel.findOne({ email })
        .populate({
            path: 'store',
        })
        .populate({ path: 'hostel' });

    return res.json({ user });
});

export const updateUserToAdmin = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.admin) req.body.admin = req.params.adminId;

        const admin = await UserModel.findByIdAndUpdate(req.body.admin, {
            role: 'admin',
        });

        if (!admin) {
            return next(new AppError('No document found with that ID', 404));
        }

        next();
    }
);

export const updateUserToVendor = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.vendor) req.body.vendor = req.params.vendorId;

        if (!req.body.vendor) {
            next(new AppError('Please Provide a user ID', 400));
        }

        const vendor = await UserModel.findByIdAndUpdate(req.body.vendor, {
            role: 'vendor',
        });

        if (!vendor) {
            return next(new AppError('No document found with that ID', 404));
        }

        next();
    }
);

export const virtualPopulate = catchAsync(
    async (req: Request, res: Response) => {
        const email = req.params.email;
        const user = await UserModel.findOne({ email })
            .populate({
                path: 'store',
            })
            .populate({ path: 'hostel' });

        return res.json({ user });
    }
);
