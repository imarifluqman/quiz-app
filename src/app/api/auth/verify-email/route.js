import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { verifyEmailSchema } from "@/lib/validations";
import { compose, withValidation } from "@/lib/middleware";
import { withRateLimit } from "@/lib/rateLimitMiddleware";
import { RATE_LIMITS } from "@/lib/rateLimiter";

async function verifyEmailHandler(request, { data }) {
  try {
    const { token } = data;

    await connectDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification link" }, { status: 400 });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Apply rate limiting and validation
export const POST = compose(
  withRateLimit({ ...RATE_LIMITS.EMAIL_VERIFY, keyPrefix: "verify-email" }),
  withValidation(verifyEmailSchema)
)(verifyEmailHandler);
