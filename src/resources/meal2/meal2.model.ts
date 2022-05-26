// language=TypeScript

// create a new model for the meal

import mongoose from 'mongoose';

const mealModel = new mongoose.Schema({
    date: {
        type: Date,
        default: new Date().toLocaleDateString(),
    },

    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: true,
    },

    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
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
        },
    ],
});

// create complex index for the meal
mealModel.index({ hostel: 1, date: 1 }, { unique: true });

export default mongoose.model('Meal2', mealModel);
