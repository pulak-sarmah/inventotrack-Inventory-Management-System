import { z } from "zod";

export const contactSchema = z.object({
  subject: z.string({
    required_error: "Subject is required",
  }),
  message: z.string({
    required_error: "Message is required",
  }),
});
