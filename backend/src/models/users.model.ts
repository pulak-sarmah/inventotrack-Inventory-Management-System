import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  photo: string;
  phone: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
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
      maxlength: [90, "Password must be at most 32 characters long"],
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const accesTokenSecret = process.env.ACCESS_TOKEN_SECRET;

if (!accesTokenSecret) {
  throw new Error("ACCESSTOKEN_TOKEN_SECRET is not defined");
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    accesTokenSecret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

export const User = mongoose.model<IUser>("User", userSchema);
