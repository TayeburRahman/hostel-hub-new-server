import { Document, Schema } from "mongoose";

export default interface IHostelAdd extends Document {
  hostel: Schema.Types.ObjectId;
  details: string;
  phone: string;
  price: number;
  numberOfVacancy: number;
}
