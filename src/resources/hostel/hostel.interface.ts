import { Document } from "mongoose";

export default interface IHostel extends Document {
  hostelName: string;
  address: string;
  thumbnail: string;
  banner: string;
  estimation: string;
  totalSit: number;
  averageRating: number;
  request: [];
  member: [];
  admin: object;
}
