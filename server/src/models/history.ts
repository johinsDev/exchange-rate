import mongoose, { Schema } from "mongoose";
import { IUser } from "./user";

export interface IHistory {
  from: string;
  to: string;
  originalValue: number;
  convert: number;
  format: string;
  user: IUser;
}

const HistorySchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true
    },
    to: {
      type: String,
      required: true,
      trim: true
    },
    originalValue: {
      type: Number,
      required: true,
      trim: true
    },
    convert: {
      type: Number,
      required: true,
      trim: true
    },
    format: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required!"]
    }
  },
  { timestamps: true }
);

export default mongoose.model<IHistory & mongoose.Document>(
  "Historu",
  HistorySchema
);
