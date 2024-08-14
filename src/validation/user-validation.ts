import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z
      .string({ required_error: "Email cannot be empty" })
      .email({ message: "Invalid email format" }),
    password: z
      .string({ required_error: "Password cannot be empty" })
      .min(6, "Password must be at least 6 character(s)")
      .max(100),
    first_name: z
      .string({ required_error: "First name cannot be empty" })
      .min(3, "First name must be at least 3 character(s)")
      .max(100, "First name cannot be more than 100 character(s)"),
    last_name: z
      .string()
      .min(3, "Last name must be at least 3 character(s)")
      .max(100, "Last name cannot be more than 100 character(s)")
      .optional(),
  });
}
