import mongoose from "mongoose";
import IHostel from "./hostel.interface.js";

const HostelModel = new mongoose.Schema(
  {
    hostelName: {
      type: String,
      trim: true,
      required: [true, "Hostel Name is Required"],
      minlength: [5, "Hostel Name can't shorter than 5 character"],
      maxlength: [100, "Hostel Name can't longer than 100 character"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    totalSit: {
      type: Number,
      required: [true, "Sit Number is Required"],
    },
    thumbnail: {
      type: String,
      default: "https://i.ibb.co/KjBG9Xf/hostel-removebg-preview.png",
    },
    banner: {
      type: String,
      default: "https://i.ibb.co/FwTndH9/banner.jpg",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "open", "closed", "deleted"],
    },
    averageRating: {
      type: Number,
    },
    estimation: {
      type: String,
      default: "monthly",
      enum: ["fortnightly", "monthly"],
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A hostel must have a Admin"],
      unique: true,
    },
    member: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate
// HostelModel.virtual('member', {
//     ref: 'HostelMember',
//     foreignField: 'userId',
//     localField: '_id',
// });

export default mongoose.model<IHostel>("Hostel", HostelModel);
