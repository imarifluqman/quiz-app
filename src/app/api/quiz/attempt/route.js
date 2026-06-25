import { connectDB } from "@/lib/mongodb";
import QuizAttempt from "@/models/QuizAttempt";
import { NextResponse } from "next/server";
import { quizAttemptSchema } from "@/lib/validations";
import { compose, withAuth, withValidation } from "@/lib/middleware";

async function attemptHandler(request, { auth, data }) {
  try {
    const { course, score, totalQuestions } = data;

    await connectDB();

    const attempt = await QuizAttempt.create({
      userId: auth.userId,
      course,
      score,
      totalQuestions,
    });

    return NextResponse.json(attempt, { status: 201 });
  } catch (error) {
    console.error("Quiz attempt error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Compose middleware: auth + validation
export const POST = compose(withAuth, withValidation(quizAttemptSchema))(attemptHandler);
