import { z, ZodType } from "zod";

export class UserValidation {
  static readonly UPDATE: ZodType = z.object({
    first_name: z
      .string()
      .min(3, "First name must be at least 3 character(s)")
      .max(100, "First name cannot be more than 100 character(s)")
      .optional(),
    last_name: z
      .string()
      .min(3, "Last name must be at least 3 character(s)")
      .max(100, "Last name cannot be more than 100 character(s)")
      .optional(),
  });
}
