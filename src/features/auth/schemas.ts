import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Minimum 2 characters").trim(),
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters"),
});
