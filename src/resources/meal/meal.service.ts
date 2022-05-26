// Language: typescript
// Path: src\resources\meal\meal.service.ts
// Compare this snippet from src\resources\meal\meal.model.ts:
// create meal service
import mongoose from 'mongoose';
import mealModel from './meal.model.js';

const ObjectId = mongoose.Types.ObjectId;

// create meal
export const createMeal = async (meal: any) => await mealModel.create(meal);

// get meals
export const getMeals = async () => await mealModel.find();

// get meal by id
export const getMealById = async (id: string) => await mealModel.findById(id);

// update meal
export const updateMeal = async (id: string, meal: any) =>
    await mealModel.findByIdAndUpdate(id, meal);

// update meal by user and date and hostel
export const updateMealByUserAndDateAndHostel = async (
    id: string,
    date: string,
    hostel: string,
    meal: any
) => {
    return await mealModel.findOneAndUpdate(
        { user: id, date: date, hostel: hostel },
        meal
    );
};

//get meal by user
export const getMealsByUser = async (id: string) => {
    return await mealModel.find({ user: id });
};

// get meal by hostel and date
export const getMealsByHostelAndDate = async (hostel: string, date: string) => {
    return await mealModel.find({ hostel: hostel, date: date });
};

// get meals by user and date
export const getMealsByUserAndDate = async (id: string, date: string) => {
    return await mealModel.find({ user: id, date: date });
};

// get meals by user and hostel
export const getMealsByUserAndHostel = async (id: string, hostel: string) => {
    return await mealModel.find({ user: id, hostel: hostel });
};

// get meals by user and hostel and date
export const getMealsByUserAndHostelAndDate = async (
    id: string,
    hostel: string,
    date: string
) => {
    return await mealModel.find({ user: id, hostel: hostel, date: date });
};

// aggregate all meals by user and month
export const getMealsByUserAndMonth = async (id: string, month: string) => {
    return await mealModel.aggregate([
        {
            $match: {
                user: id,
                date: {
                    $gte: new Date(`${month}-01`),
                    $lte: new Date(`${month}-31`),
                },
            },
        },
        {
            $group: {
                _id: {
                    user: '$user',
                    month: { $month: '$date' },
                },
                total: { $sum: '$breakfast' },
            },
        },
    ]);
};

// aggregate all meals by hostel and current month
export const getMealsByHostelAndCurrentMonth = async (id: string) => {
    const data = await mealModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
            },
        },

        {
            $match: {
                hostel: new ObjectId(id),
                date: {
                    $gte: new Date(
                        `${new Date().getFullYear()}-${
                            new Date().getMonth() + 1
                        }-01`
                    ),
                    $lte: new Date(
                        `${new Date().getFullYear()}-${
                            new Date().getMonth() + 1
                        }-31`
                    ),
                },
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                users: {
                    $push: {
                        breakfast: '$breakfast',
                        lunch: '$lunch',
                        dinner: '$dinner',
                        user: '$user',
                        date: '$date',
                    },
                },
            },
        },
        {
            $sort: { _id: 1 },
        },
    ]);

    return data;
};

// aggregate all meals by hostel and month
export const getMealsByHostelAndMonth = async (id: string, month: string) => {
    return await mealModel.aggregate([
        {
            $match: {
                hostel: id,
                date: {
                    $gte: new Date(`${month}-01`),
                    $lte: new Date(`${month}-31`),
                },
            },
        },
        {
            $group: {
                _id: {
                    hostel: '$hostel',
                    month: { $month: '$date' },
                },
                total: { $sum: '$breakfast' },
            },
        },
    ]);
};

// aggregate all meals by user and current month
export const getMealsByUserAndCurrentMonth = async (id: string) => {
    return await mealModel.aggregate([
        {
            $match: {
                user: id,
                date: {
                    $gte: new Date(
                        `${new Date().getFullYear()}-${
                            new Date().getMonth() + 1
                        }-01`
                    ),
                    $lte: new Date(
                        `${new Date().getFullYear()}-${
                            new Date().getMonth() + 1
                        }-31`
                    ),
                },
            },
        },
        {
            $group: {
                _id: {
                    user: '$user',
                    month: { $month: '$date' },
                },
                total: { $sum: '$breakfast' },
            },
        },
    ]);
};

// aggregate all meals by user and last month
export const getMealsByUserAndLastMonth = async (id: string) => {
    return await mealModel.aggregate([
        {
            $match: {
                user: id,
                date: {
                    $gte: new Date(
                        `${new Date().getFullYear()}-${new Date().getMonth()}-01`
                    ),
                    $lte: new Date(
                        `${new Date().getFullYear()}-${new Date().getMonth()}-31`
                    ),
                },
            },
        },
        {
            $group: {
                _id: {
                    user: '$user',
                    month: { $month: '$date' },
                },
                total: { $sum: '$breakfast' },
            },
        },
    ]);
};

// aggregate all meals by user and year
export const getMealsByUserAndYear = async (id: string, year: string) => {
    return await mealModel.aggregate([
        {
            $match: {
                user: id,
                date: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: {
                    user: '$user',
                    year: { $year: '$date' },
                },
                total: { $sum: '$breakfast' },
            },
        },
    ]);
};

// aggregate all meals by hostel and year
export const getMealsByHostelAndYear = async (id: string, year: string) => {
    return await mealModel.aggregate([
        {
            $match: {
                hostel: id,
                date: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: {
                    hostel: '$hostel',
                    year: { $year: '$date' },
                },
                total: { $sum: '$breakfast' },
            },
        },
    ]);
};

// aggregate all meals by hostel and current year
export const getMealsByHostelAndCurrentYear = async (id: string) => {
    return await mealModel.aggregate([
        {
            $match: {
                hostel: id,
                date: {
                    $gte: new Date(`${new Date().getFullYear()}-01-01`),
                    $lte: new Date(`${new Date().getFullYear()}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: {
                    hostel: '$hostel',
                    year: { $year: '$date' },
                },
                total: { $sum: '$breakfast' },
            },
        },
    ]);
};

// aggregate all meals by user and current year
export const getMealsByUserAndCurrentYear = async (id: string) => {
    return await mealModel.aggregate([
        {
            $match: {
                user: id,
                date: {
                    $gte: new Date(`${new Date().getFullYear()}-01-01`),
                    $lte: new Date(`${new Date().getFullYear()}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: {
                    user: '$user',
                    year: { $year: '$date' },
                },
                total: { $sum: '$breakfast' },
            },
        },
    ]);
};

// compare a hostel's meals with another hostel's meals
// export const compareMeals = async (id: string, hostel: string) => {
//     const meals = await getMealsByHostelAndCurrentMonth(id);
//     const hostelMeals = await getMealsByHostelAndCurrentMonth(hostel);
//     const result = [];
//     for (let i = 0; i < meals.length; i++) {
//         const meal = meals[i];
//         const hostelMeal = hostelMeals.find(
//             (m) => m._id.month === meal._id.month
//         );
//         if (hostelMeal) {
//             result.push({
//                 month: meal._id.month,
//                 total: meal.total,
//                 hostelTotal: hostelMeal.total,
//             });
//         }
//     }
//     return result;
// };

// compare a user's meals with another user's meals
export const compareMealsByUser = async (id: string, user: string) => {
    const meals = await getMealsByUserAndCurrentMonth(id);
    const userMeals = await getMealsByUserAndCurrentMonth(user);
    const result = [];
    for (let i = 0; i < meals.length; i++) {
        const meal = meals[i];
        const userMeal = userMeals.find((m) => m._id.month === meal._id.month);
        if (userMeal) {
            result.push({
                month: meal._id.month,
                total: meal.total,
                userTotal: userMeal.total,
            });
        }
    }
    return result;
};

// compare a user's meals with last month's meals
export const compareMealsByUserLastMonth = async (id: string) => {
    const meals = await getMealsByUserAndCurrentMonth(id);
    const lastMonthMeals = await getMealsByUserAndMonth(id, 'last');
    const result = [];
    for (let i = 0; i < meals.length; i++) {
        const meal = meals[i];
        const lastMonthMeal = lastMonthMeals.find(
            (m) => m._id.month === meal._id.month
        );
        if (lastMonthMeal) {
            result.push({
                month: meal._id.month,
                total: meal.total,
                lastMonthTotal: lastMonthMeal.total,
            });
        }
    }
    return result;
};
