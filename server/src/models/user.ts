import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import { ConfigContract } from "../lib/Config";
import jwt from "jsonwebtoken";
import Container from "typedi";
import { randomBytes } from "crypto";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  tokens: { token: string }[];
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
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      lowercase: true,
      index: true
    },

    password: {
      type: String,
      required: true,
      minLength: 6
    },

    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],

    salt: String,

    lastLogin: Date
  },
  { timestamps: true }
);

User.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    const salt = randomBytes(32);

    user.password = await bcrypt.hash(user.password, 8);

    user.salt = salt.toString("hex");
  }
  next();
});

User.methods.generateAuthToken = async function() {
  const Config: ConfigContract = Container.get("config");

  const today = new Date();

  const exp = new Date(today);

  exp.setDate(today.getDate() + 60);

  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      exp: exp.getTime() / 1000
    },
    Config.get("app.jwtSecret")
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

User.methods.toJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    tokens: this.tokens
  };
};

User.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("Invalid login credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid login credentials");
  }

  return user;
};

const UserModel = mongoose.model<IUser & mongoose.Document>("User", User);

export default UserModel;
