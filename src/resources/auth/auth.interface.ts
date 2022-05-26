import { Document } from 'mongoose';

export default interface IUser extends Document {
    name: string;
    email: string;
    role: string;
    img: string;
    phone: string;
    status: string;
}
