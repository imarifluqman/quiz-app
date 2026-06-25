import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";
import { registerSchema } from "@/lib/validations";
import { compose, withValidation } from "@/lib/middleware";
import { withEmailRateLimit } from "@/lib/rateLimitMiddleware";
import { RATE_LIMITS } from "@/lib/rateLimiter";

async function registerHandler(request, { data }) {
  try {
    const { name, fatherName, email, phone, password } = data;

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    await User.create({
      name,
      fatherName,
      email,
      phone,
      password: hashedPassword,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "Verification email sent. Please check your inbox." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Apply rate limiting by email and validation
export const POST = compose(
  withEmailRateLimit({ ...RATE_LIMITS.REGISTER, keyPrefix: "register" }),
  withValidation(registerSchema)
)(registerHandler);
