import { Document, Schema } from 'mongoose';

export default interface IHostelBooking extends Document {
    hostelId: Schema.Types.ObjectId;
    addId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
}
