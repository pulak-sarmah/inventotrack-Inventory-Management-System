import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { registerSchema } from "../validations/userSchemas";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/users.model";
import { ApiResponse } from "../utils/ApiResponse";

const generateAccessTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(400, "user not found");
    }
    const accessToken = user.generateAccessToken();

    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Token generation failed");
  }
};

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const inputData = registerSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.issues[0].message);
  }

  const { email: inputEmail, password, name: InputName } = inputData.data;
  const userExists = await User.findOne({ email: inputEmail });

  if (userExists) {
    throw new ApiError(400, "Email has already been registered");
  }

  const user = await User.create({
    name: InputName,
    email: inputEmail,
    password,
  });
  if (!user) {
    throw new ApiError(500, "User not created");
  }

  const accessToken = await generateAccessTokens(user._id);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  const { _id, name, email, photo, phone, bio, createdAt, updatedAt } = user;

  res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        { _id, name, email, photo, phone, bio, createdAt, updatedAt },
        "User created"
      )
    );
});

export { registerUser };
