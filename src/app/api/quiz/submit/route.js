import { connectDB } from "@/lib/mongodb";
import QuizAttempt from "@/models/QuizAttempt";
import { NextResponse } from "next/server";
import { quizSubmissionSchema } from "@/lib/validations";
import { compose, withAuth, withValidation } from "@/lib/middleware";
import { withRateLimit } from "@/lib/rateLimitMiddleware";
import { RATE_LIMITS } from "@/lib/rateLimiter";
import quiz from "@/app/components/quiz.json";

async function submitQuizHandler(request, { auth, data }) {
  try {
    const { course, answers, timeSpent } = data;

    // Get the questions for this course
    const questions = quiz[course];

    if (!questions || questions.length === 0) {
      return NextResponse.json({ error: "Invalid course or no questions available" }, { status: 400 });
    }

    // Calculate score server-side
    let correctCount = 0;
    const totalQuestions = questions.length;

    questions.forEach((question, index) => {
      const userAnswer = answers[index.toString()];
      if (userAnswer && userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);

    await connectDB();

    // Store the attempt
    const attempt = await QuizAttempt.create({
      userId: auth.userId,
      course,
      score,
      totalQuestions,
      timeSpent,
    });

    return NextResponse.json(
      {
        attemptId: attempt._id,
        score,
        correctCount,
        totalQuestions,
        passed: score >= 50,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Apply auth, rate limiting (prevent spam submissions), and validation
export const POST = compose(
  withAuth,
  withRateLimit({ limit: 20, windowMs: 60 * 60 * 1000, keyPrefix: "quiz-submit" }), // 20 submissions per hour
  withValidation(quizSubmissionSchema)
)(submitQuizHandler);
