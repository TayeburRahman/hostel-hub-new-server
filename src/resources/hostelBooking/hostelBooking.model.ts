import mongoose from 'mongoose';
import IHostelBooking from './hostelBooking.interface.js';

const HostelBookingModel = new mongoose.Schema(
    {
        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hostel',
            required: [true, 'A hostelBooking must have a hostel'],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'A hostelBooking must have a user'],
        },
        addId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HostelAdd',
            required: [true, 'A hostelBooking must have a add'],
        },
    },
    {
        timestamps: true,
    }
);

HostelBookingModel.index({ addId: 1, userId: 1 }, { unique: true });

export default mongoose.model<IHostelBooking>(
    'HostelBooking',
    HostelBookingModel
);
