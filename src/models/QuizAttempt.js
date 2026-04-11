import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  attemptedAt: { type: Date, default: Date.now },
});

export default mongoose.models.QuizAttempt || mongoose.model("QuizAttempt", quizAttemptSchema);
