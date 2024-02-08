import { Request as ExpressRequest, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { productSchema } from "../validations/productSchemas";
import { Product } from "../models/product.model";
import { UserPayload } from "../types";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

interface Request extends ExpressRequest {
  user?: UserPayload;
}

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const inputData = productSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.errors[0].message);
  }

  const product = await Product.create({
    ...inputData.data,
    user: req.user?._id,
  });

  if (!product) {
    throw new ApiError(500, "Product not created");
  }

  res.status(201).json(new ApiResponse(201, product, "Product created"));
});

export { createProduct };
