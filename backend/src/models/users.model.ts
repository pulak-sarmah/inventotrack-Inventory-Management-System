import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  phone: string;
  bio: string;
  // isPasswordCorrect(password: string): Promise<boolean>;
  // generateAccessToken(): string;
  // generateRefreshToken(): string;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [32, "Password must be at most 32 characters long"],
    },

    photo: {
      type: String,
      required: [true, "Please enter your photo"],
      default: "https://www.gravatar.com/avatar/?d=mp",
    },
    phone: {
      type: String,
      default: "+91",
    },
    bio: {
      type: String,
      maxlenght: [150, "Bio must be at most 150 characters long"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
