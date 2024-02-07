import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters")
    .max(32)
    .refine((value) => /\d/.test(value), {
      message: "Password must include a number",
    }),
  name: z
    .string({
      required_error: "firstName is required",
    })
    .min(2, "firstName must be at least 2 characters")
    .max(20),
});
