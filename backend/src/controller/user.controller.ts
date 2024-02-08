import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Request as ExpressRequest, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  updateUserSchema,
  resetPasswordSchema,
} from "../validations/userSchemas";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/users.model";
import { ApiResponse } from "../utils/ApiResponse";
import { UserPayload } from "../types";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { Token } from "../models/token.model";
import sendEmail from "../utils/sendEmail";

interface Request extends ExpressRequest {
  user?: UserPayload;
}

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
  if (req.cookies?.accessToken) {
    throw new ApiError(400, "User already logged in");
  }

  const inputData = loginSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.issues[0].message);
  }

  const { email: inputEmail, password } = inputData.data;

  const user = await User.findOne({ email: inputEmail });

  if (!user) {
    throw new ApiError(400, "Invalid email");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

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

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie("accessToken", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    })
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

const loggedInStatus = asyncHandler(async (req: Request, res: Response) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(200).json(new ApiResponse(200, false, "User not logged in"));
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new ApiError(400, "access token not found");
  }

  try {
    const decoded = jwt.verify(token, secret) as UserPayload | string;

    if (typeof decoded !== "object" || !("_id" in decoded)) {
      res.status(200).json(new ApiResponse(200, false, "User not logged in"));
    }
  } catch (error) {
    res.status(200).json(new ApiResponse(200, false, "User not logged in"));
  }

  res.status(200).json(new ApiResponse(200, true, "User is logged in"));
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const inputData = updateUserSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.issues[0].message);
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const { name, photo, phone, bio } = user;

  let avatar;
  const avatarLocalPath = req.file?.path;
  if (avatarLocalPath) {
    avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Avatar upload failed");
    }
  }

  user.name = inputData.data.name || name;
  user.phone = inputData.data.phone || phone;
  user.bio = inputData.data.bio || bio;
  user.photo = avatar?.url || photo;

  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new ApiError(500, "User not updated");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
      },
      "User updated"
    )
  );
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const inputData = changePasswordSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.issues[0].message);
  }

  const { oldPassword, newPassword } = inputData.data;

  if (!req.user) {
    throw new ApiError(401, "Unauthorized request");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(401, "No user found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Password is incorrect");
  }

  user.password = newPassword;

  await user.save({
    validateBeforeSave: false,
  });
  res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"));
});

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const inputData = forgotPasswordSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.issues[0].message);
  }

  const { email } = inputData.data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const token = await Token.findOne({ userId: user._id });

  if (token) {
    await token.deleteOne();
  }

  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiredAt: Date.now() + 30 * (60 * 1000),
  }).save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const message = `<h1>Reset your password</h1> 
  <hr/> 
  <h2>Hello ${user.name}</h2> 
  <p>Click the link below to reset your password</p> 
  <p>This Link is valid for 30 mint</p> 
  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

  <p>regards...</p>
  <p>InventoTrack Team</p>
  `;

  const subject = "Password Reset Request-InventoTrack";

  const send_to = user.email;

  const send_from = process.env.EMAIL_USERNAME as string;

  try {
    await sendEmail({
      subject,
      message,
      send_to,
      send_from,
      reply_to: send_from,
    });

    res
      .status(200)
      .json(new ApiResponse(200, null, "Reset link sent to email"));
  } catch (error) {
    throw new ApiError(500, "Email not sent");
  }
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const inputData = resetPasswordSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.issues[0].message);
  }
  const { resetToken } = req.params;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const userToken = await Token.findOne({
    token: hashedToken,
    expiredAt: { $gt: Date.now() },
  });

  if (!userToken) {
    throw new ApiError(404, "Token is invalid or expired");
  }

  const user = await User.findOne({ _id: userToken.userId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.password = inputData.data.newPassword;

  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, null, "Password reset successful, please login")
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loggedInStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
