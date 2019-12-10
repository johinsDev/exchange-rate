import mongoose from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"],
      index: true
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true
    },

    password: String,

    salt: String,

    role: {
      type: String,
      default: "user"
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser & mongoose.Document>("User", User);
