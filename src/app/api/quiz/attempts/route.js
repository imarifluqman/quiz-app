import { connectDB } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";
import QuizAttempt from "@/models/QuizAttempt";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const attempts = await QuizAttempt.find({ userId: auth.userId }).sort({ attemptedAt: -1 });

    return NextResponse.json(attempts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
