import mongoose from 'mongoose';
import IHostelMember from './hostelMember.interface.js';

const HostelMemberModel = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

HostelMemberModel.index({ hostelId: 1, userId: 1 }, { unique: true });

export default mongoose.model<IHostelMember>('HostelMember', HostelMemberModel);
