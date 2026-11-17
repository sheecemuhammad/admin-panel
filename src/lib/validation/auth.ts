import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const updatePasswordSchema = z
  .object({
    email: z.email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

export const verificationCodeSchema = z.object({
  code: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Enter the 6-digit code"),
});

export type VerificationCodeFormValues = z.infer<typeof verificationCodeSchema>;
