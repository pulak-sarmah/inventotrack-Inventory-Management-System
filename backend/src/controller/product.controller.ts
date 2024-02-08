import { Request as ExpressRequest, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { productSchema } from "../validations/productSchemas";
import { Product } from "../models/product.model";
import { UserPayload } from "../types";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { fileSizeFormatter } from "../utils/fileSizeFormatter";
import { uploadOnCloudinary } from "../utils/cloudinary";

interface Request extends ExpressRequest {
  user?: UserPayload;
}

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const inputData = productSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.errors[0].message);
  }

  let fileData = {};
  if (req.file) {
    const uploadedFile = await uploadOnCloudinary(req.file.path);

    if (!uploadedFile) {
      throw new ApiError(500, "Image upload failed");
    }

    fileData = {
      fileName: uploadedFile?.original_filename,
      filePath: uploadedFile?.url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  const product = await Product.create({
    ...inputData.data,
    user: req.user?._id,
    image: fileData,
  });

  if (!product) {
    throw new ApiError(500, "Product not created");
  }

  res.status(201).json(new ApiResponse(201, product, "Product created"));
});

export { createProduct };
