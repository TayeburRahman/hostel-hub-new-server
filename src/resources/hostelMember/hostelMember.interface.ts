import { Document, Schema } from 'mongoose';

export default interface IHostelMember extends Document {
    hostelId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
}
