import mongoose from 'mongoose';
import IHostelAdd from './hostelAdd.interface.js';

const HostelAddModel = new mongoose.Schema(
    {
        numberOfVacancy: {
            type: Number,
            required: [true, 'Sit Number is Required'],
        },
        hostel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hostel',
            required: [true, 'A hostel must have a Admin'],
        },
        details: {
            type: String,
            required: [true, 'detail is Required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone Number is Required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is Required'],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IHostelAdd>('HostelAdd', HostelAddModel);
