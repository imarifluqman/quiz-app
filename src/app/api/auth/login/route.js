import { connectDB } from "@/lib/mongodb";
import { signToken, setTokenCookie } from "@/lib/auth";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (!user.isEmailVerified && user.role !== "admin") {
      return NextResponse.json({ error: "Please verify your email first. Check your inbox." }, { status: 403 });
    }

    const token = signToken(user._id.toString());

    const response = NextResponse.json(
      { _id: user._id, name: user.name, fatherName: user.fatherName, email: user.email, phone: user.phone, role: user.role },
      { status: 200 }
    );

    return setTokenCookie(response, token);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
