import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { loginSchema, registerSchema } from "../validations/userSchemas";
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

  const { _id, name, email, photo, phone, bio, createdAt, updatedAt } = user;

  res
    .status(201)
    .cookie("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
    })
    .json(
      new ApiResponse(
        201,
        { _id, name, email, photo, phone, bio, createdAt, updatedAt },
        "User created"
      )
    );
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const inputData = loginSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.issues[0].message);
  }

  const { email: inputEmail, oldPassword } = inputData.data;

  const user = await User.findOne({ email: inputEmail });

  if (!user) {
    throw new ApiError(400, "Invalid email");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  const accessToken = await generateAccessTokens(user._id);

  const { _id, name, email, photo, phone, bio, createdAt, updatedAt } = user;

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: true,
    })
    .json(
      new ApiResponse(
        200,
        { _id, name, email, photo, phone, bio, createdAt, updatedAt },
        "User logged in successfully"
      )
    );
});

export { registerUser, loginUser };
