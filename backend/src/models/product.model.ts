import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  user: string;
  name: string;
  sku: string;
  category: string;
  quantity: string;
  price: string;
  description: string;
  image: object;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: [true, "please add a name"], trim: true },
    sku: { type: String, required: true, default: "0000", trim: true },
    category: {
      type: String,
      required: [true, "please add category"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "please add quantity"],
      trim: true,
    },

    price: {
      type: String,
      required: [true, "please add a price"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "please add a description"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
