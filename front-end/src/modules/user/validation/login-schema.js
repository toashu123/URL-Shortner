import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
    
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(25, "Password must be less than 25 characters"),
});
