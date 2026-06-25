import { connectDB } from "@/lib/mongodb";
import QuizAttempt from "@/models/QuizAttempt";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware";

async function getAttemptsHandler(request, { auth }) {
  try {
    await connectDB();

    const attempts = await QuizAttempt.find({ userId: auth.userId }).sort({ attemptedAt: -1 });

    return NextResponse.json(attempts, { status: 200 });
  } catch (error) {
    console.error("Get attempts error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export const GET = withAuth(getAttemptsHandler);
