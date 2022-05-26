import { Document, Schema } from 'mongoose';

export default interface IStore extends Document {
    storeName: string;
    address: string;
    thumbnail: string;
    banner: string;
    averageRating: number;
    vendor: Schema.Types.ObjectId;
    status: 'open' | 'close';
}
