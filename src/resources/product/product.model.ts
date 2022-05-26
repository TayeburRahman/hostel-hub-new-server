import mongoose from 'mongoose';
import IProduct from './product.interface.js';

const ProductModel = new mongoose.Schema(
    {
        category: {
            type: String,
            required: [true, 'A product must under a category'],
        },
        title: {
            type: String,
            required: [true, 'Title is Required!'],
            maxlength: [120, "Title can't longer than 120 character"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A Product must have a user'],
        },
        img: String,
        description: String,
        phone: {
            type: String,
            required: [true, 'A product must have a phone number'],
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

export default mongoose.model<IProduct>('Product', ProductModel);
