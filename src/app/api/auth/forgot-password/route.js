import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { sendResetPasswordEmail } from "@/lib/email";
import { forgotPasswordSchema } from "@/lib/validations";
import { compose, withValidation } from "@/lib/middleware";
import { withEmailRateLimit } from "@/lib/rateLimitMiddleware";
import { RATE_LIMITS } from "@/lib/rateLimiter";

async function forgotPasswordHandler(request, { data }) {
  try {
    const { email } = data;

    await connectDB();

    const user = await User.findOne({ email });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ message: "If an account exists, a reset link has been sent." }, { status: 200 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await user.save();

    await sendResetPasswordEmail(user.email, resetToken);

    return NextResponse.json({ message: "If an account exists, a reset link has been sent." }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Apply rate limiting by email and validation
export const POST = compose(
  withEmailRateLimit({ ...RATE_LIMITS.PASSWORD_RESET, keyPrefix: "forgot-password" }),
  withValidation(forgotPasswordSchema)
)(forgotPasswordHandler);
