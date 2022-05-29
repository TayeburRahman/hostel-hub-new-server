import mongoose from "mongoose";
import IUser from "./auth.interface.js";

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["member", "admin", "moderator", "vendor", "user"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "verified", "blocked"],
    },
    img: {
      type: String,
      default: "https://i.ibb.co/dBQjP3N/profile.png",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate
UserModel.virtual("hostel", {
  ref: "Hostel",
  foreignField: "admin",
  localField: "_id",
});

UserModel.virtual("store", {
  ref: "Store",
  foreignField: "vendor",
  localField: "_id",
});

export default mongoose.model<IUser>("User", UserModel);
