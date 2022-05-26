import mongoose from 'mongoose';
import { Meal } from './meal.interface';

// create meal model
const MealModel = new mongoose.Schema(
    {
        hostel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hostel',
            required: [true, 'A hostel must have a Admin'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A meal must have a user'],
        },
        breakfast: {
            type: Number,
            default: 0,
        },
        lunch: {
            type: Number,
            default: 0,
        },
        dinner: {
            type: Number,
            default: 0,
        },
        date: {
            type: Date,
            default: new Date().toLocaleDateString(),
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// create complex index
MealModel.index({ hostel: 1, user: 1, date: 1 }, { unique: true });

//pre find middleware
MealModel.pre(/^find/, function (next) {
    this.populate({
        path: 'hostel',
        select: '-createdAt -updatedAt -__v',
    });
    this.populate({
        path: 'user',
        select: '-createdAt -updatedAt -__v',
    });

    this.select('-createdAt -updatedAt -__v');
    next();
});

//export meal model
export default mongoose.model<Meal>('Meal', MealModel);
