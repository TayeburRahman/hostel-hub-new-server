import { Request, Response } from 'express';
import { catchAsync } from './../../utility/catchAsync.js';
import meal2Model from './meal2.model.js';
// language = TypeScript
// Path = src\resources\meal2\meal2.model.ts

// create controller for the meal

export const createMeal = catchAsync(async (req: Request, res: Response) => {
    const meal = await meal2Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: meal,
    });
});

// get all meals
export const getAllMeals = catchAsync(async (req: Request, res: Response) => {
    const meals = await meal2Model.find();
    res.status(200).json({
        status: 'success',
        results: meals.length,
        data: meals,
    });
});

// update meal
export const updateMeal = catchAsync(async (req: Request, res: Response) => {
    const meal = await meal2Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!meal) {
        return res.status(404).json({
            status: 'fail',
            message: 'Meal not found',
        });
    }
    res.status(200).json({
        status: 'success',
        data: meal,
    });
});
