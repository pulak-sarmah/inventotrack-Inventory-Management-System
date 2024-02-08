import { Request as ExpressRequest, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { contactSchema } from "../validations/contactSchema";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/users.model";
import { UserPayload } from "../types";
import { ApiResponse } from "../utils/ApiResponse";
import sendEmail from "../utils/sendEmail";

interface Request extends ExpressRequest {
  user?: UserPayload;
}

const contactUs = asyncHandler(async (req: Request, res: Response) => {
  const inputData = contactSchema.safeParse(req.body);

  if (!inputData.success) {
    throw new ApiError(400, inputData.error.errors[0].message);
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "User not found, please login again");
  }

  const send_to = process.env.EMAIL_USERNAME as string;
  const send_from = process.env.EMAIL_USERNAME as string;
  const reply_to = user.email;

  try {
    await sendEmail({
      ...inputData.data,
      send_to,
      send_from,
      reply_to,
    });

    res.status(200).json(new ApiResponse(200, null, "email send successfully"));
  } catch (error) {
    throw new ApiError(500, "Email not sent");
  }
});

export { contactUs };
