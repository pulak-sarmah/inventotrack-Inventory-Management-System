import { Request as ExpressRequest, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  productSchema,
  productUpdateSchema,
} from "../validations/productSchemas";
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

  const productExists = await Product.find({ sku: inputData.data.sku });

  if (productExists.length > 0) {
    throw new ApiError(400, "Product already exists");
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

const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.find({
    user: req.user?._id,
  })
    .sort("createdAt")
    .populate("user", "email name");

  if (product.length === 0) {
    throw new ApiError(404, "No Product found");
  }

  res.status(200).json(new ApiResponse(200, product, "Product found"));
});

const getSingleProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params?.id);

  if (!product) {
    throw new ApiError(404, "No Product found");
  }

  if (product.user.toString() !== req.user?._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  res.status(200).json(new ApiResponse(200, product, "Product found"));
});

const deteteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params?.id);

  if (!product) {
    throw new ApiError(404, "No Product found");
  }

  if (product.user.toString() !== req.user?._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  await Product.deleteOne({ _id: product._id });

  res.status(200).json(new ApiResponse(200, null, "Product Deleted"));
});

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const inputData = productUpdateSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.errors[0].message);
  }

  const product = await Product.findById(req.params?.id);

  if (!product) {
    throw new ApiError(404, "No Product found");
  }

  if (product.user.toString() !== req.user?._id.toString()) {
    throw new ApiError(404, "Unauthorized");
  }

  if (!req.file?.filename && Object.keys(inputData.data).length === 0) {
    throw new ApiError(400, "No data to update");
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

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: req.params?.id },
    {
      ...inputData.data,
      image: Object.keys(fileData).length === 0 ? product.image : fileData,
    },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Product not updated");
  }

  res
    .status(201)
    .json(new ApiResponse(201, updatedProduct, "Product updated successfully"));
});

export {
  createProduct,
  getProducts,
  getSingleProduct,
  deteteProduct,
  updateProduct,
};
