import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less")
    .trim(),
});

export type UpdateProfileFormType = z.infer<typeof updateProfileSchema>;

export const updateProfileDefaultValues: UpdateProfileFormType = {
  firstName: "",
  lastName: "",
};
