import mongoose from 'mongoose';
import IStore from './store.interface.js';

const StoreModel = new mongoose.Schema(
    {
        storeName: {
            type: String,
            trim: true,
            required: [true, 'Hostel Name is Required'],
            minlength: [5, "Hostel Name can't shorter than 5 character"],
            maxlength: [100, "Hostel Name can't longer than 100 character"],
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
        },
        thumbnail: {
            type: String,
            default: 'https://i.ibb.co/KjBG9Xf/hostel-removebg-preview.png',
        },
        banner: {
            type: String,
            default: 'https://i.ibb.co/FwTndH9/banner.jpg',
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A hostel must have a Admin'],
            unique: true,
        },
        status: {
            type: String,
            default: 'open',
            enum: ['open', 'close'],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

StoreModel.pre(/^find/, function (next) {
    this.populate({
        path: 'vendor',
        select: '-createdAt -updatedAt -__v',
    }).select('-__v -updatedAt');
    next();
});

// virtual population
StoreModel.virtual('products', {
    ref: 'Product',
    foreignField: 'store',
    localField: '_id',
});

export default mongoose.model<IStore>('Store', StoreModel);
