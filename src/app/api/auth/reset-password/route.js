import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { resetPasswordSchema } from "@/lib/validations";
import { compose, withValidation } from "@/lib/middleware";
import { withRateLimit } from "@/lib/rateLimitMiddleware";
import { RATE_LIMITS } from "@/lib/rateLimiter";

async function resetPasswordHandler(request, { data }) {
  try {
    const { token, password } = data;

    await connectDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Apply rate limiting and validation
export const POST = compose(
  withRateLimit({ ...RATE_LIMITS.AUTH_STRICT, keyPrefix: "reset-password" }),
  withValidation(resetPasswordSchema)
)(resetPasswordHandler);
