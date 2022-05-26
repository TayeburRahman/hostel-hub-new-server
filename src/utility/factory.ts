import { NextFunction, Request, Response } from 'express';
import { APIFeatures } from './apiFeatures.js';
import { AppError } from './appError.js';
import { catchAsync } from './catchAsync.js';

export const getAll = (Model: any, popOptions?: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        // To allow for nested GET reviews on tour (hack)
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };

        const features = new APIFeatures(
            Model.find(filter),
            req.query,
            popOptions
        )
            .filter()
            .sort()
            .limitFields()
            .paginate()
            .populate();

        // const doc = await features.query.explain();
        const doc = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc,
            },
        });
    });

export const deleteOne = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        return res.status(204).json({
            status: 'success',
            data: null,
        });
    });

export const createOne = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

export const getOne = (Model: any, popOptions?: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

export const updateOne = (Model: any) =>
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });
