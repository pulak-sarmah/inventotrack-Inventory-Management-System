import { Request as ExpressRequest, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/users.model";
import { ApiError } from "../utils/ApiError";
import { UserPayload } from "../../types";

interface Request extends ExpressRequest {
  user?: UserPayload;
}

export const varifyJWT = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new ApiError(401, "Unauthorized request");
      }

      const secret = process.env.ACCESS_TOKEN_SECRET;
      if (!secret) {
        throw new ApiError(400, "access token not found");
      }

      let decoded: UserPayload | string;
      try {
        decoded = jwt.verify(token, secret) as UserPayload | string;
      } catch (error) {
        throw new ApiError(401, "Invalid or expired accessToken");
      }

      if (typeof decoded !== "object" || !("_id" in decoded)) {
        throw new ApiError(401, "Invalid accessToken");
      }

      const user = await User.findById(decoded?._id).select("-password");

      if (!user) {
        throw new ApiError(401, "Invalid accessToken");
      }

      req.user = user;

      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(401, error?.message);
      } else {
        throw new ApiError(401, "Invalid accessToken");
      }
    }
  }
);
