import { Document, Schema } from 'mongoose';

export default interface IProduct extends Document {
    userId: Schema.Types.ObjectId;
    category: string;
    title: string;
    description: string;
    price: string;
    img: string;
    phone: string;
}
