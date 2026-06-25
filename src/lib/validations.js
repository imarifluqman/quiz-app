import { z } from "zod";

// Auth validations
export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name too long"),
  fatherName: z.string().min(3, "Father name must be at least 3 characters").max(100, "Father name too long"),
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  phone: z.string()
    .regex(/^0\d{10}$/, "Phone must be 11 digits starting with 0")
    .length(11, "Phone must be exactly 11 digits"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password too long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password too long"),
  confirmPassword: z.string(),
  token: z.string().min(1, "Token is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

// Quiz validations
export const quizAttemptSchema = z.object({
  course: z.enum(["html", "css", "javascript", "typescript"], {
    errorMap: () => ({ message: "Invalid course" }),
  }),
  score: z.number().min(0, "Score must be at least 0").max(100, "Score cannot exceed 100"),
  totalQuestions: z.number().min(1, "Total questions must be at least 1"),
});

// NEW: Quiz submission with answers for server-side validation
export const quizSubmissionSchema = z.object({
  course: z.enum(["html", "css", "javascript", "typescript"], {
    errorMap: () => ({ message: "Invalid course" }),
  }),
  answers: z.record(z.string(), z.string()), // { "0": "answer1", "1": "answer2", ... }
  timeSpent: z.number().min(0).optional(), // Time spent in seconds
});

// Admin validations
export const updateUserSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  fatherName: z.string().min(3).max(100).optional(),
  email: z.string().email().toLowerCase().trim().optional(),
  phone: z.string().regex(/^0\d{10}$/).length(11).optional(),
  role: z.enum(["student", "admin"]).optional(),
  isEmailVerified: z.boolean().optional(),
});

export const mongoIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

// Helper function to validate and return errors
export function validateSchema(schema, data) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return { success: false, errors };
  }

  return { success: true, data: result.data };
}

// Middleware-style validator
export function createValidator(schema) {
  return (data) => {
    const result = validateSchema(schema, data);
    if (!result.success) {
      const errorMessage = result.errors.map((e) => e.message).join(", ");
      throw new Error(errorMessage);
    }
    return result.data;
  };
}
