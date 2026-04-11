import { connectDB } from "@/lib/mongodb";
import { verifyAuth } from "@/lib/auth";
import QuizAttempt from "@/models/QuizAttempt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const auth = await verifyAuth();
    if (!auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { course, score, totalQuestions } = await request.json();

    if (!course || score === undefined || !totalQuestions) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const attempt = await QuizAttempt.create({
      userId: auth.userId,
      course,
      score,
      totalQuestions,
    });

    return NextResponse.json(attempt, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
