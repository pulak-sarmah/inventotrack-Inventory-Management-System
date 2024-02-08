import { z } from "zod";

export const productSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  price: z.string({
    required_error: "Price is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  quantity: z.string({
    required_error: "CountInStock is required",
  }),
  sku: z.string({
    required_error: "SKU is required",
  }),
});

export const productUpdateSchema = z.object({
  name: z.string().optional(),
  price: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  quantity: z.string().optional(),
});
