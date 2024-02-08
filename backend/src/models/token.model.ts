import mongoose, { Document } from "mongoose";

export interface IToken extends Document {
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
  expiredAt: Date;
}

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
});

export const Token = mongoose.model<IToken>("Token", tokenSchema);
