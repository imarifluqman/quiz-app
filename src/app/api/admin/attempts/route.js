import { connectDB } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";
import User from "@/models/User";
import QuizAttempt from "@/models/QuizAttempt";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const currentUser = await User.findById(auth.userId).select("role");
    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const attempts = await QuizAttempt.find()
      .populate("userId", "name email")
      .sort({ attemptedAt: -1 });

    return NextResponse.json(attempts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
