"use client";
import quiz from "../components/quiz.json";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/loader/Loader";
import { useAuth } from "../components/AuthContext";
import { useQuiz } from "../components/QuizContext";

export default function Question() {
  const { user } = useAuth();
  const { currentCourse, saveProgress, clearQuiz } = useQuiz();
  const [num, setNum] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes total
  const router = useRouter();

  const course = currentCourse;
  const questions = course ? quiz[course] : [];
  const total = questions.length;
  const isLast = num === total - 1;
  const isFirst = num === 0;

  const finishQuiz = useCallback(() => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    const finalScore = Math.round((correct / total) * 100);

    fetch("/api/quiz/attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course,
        score: finalScore,
        totalQuestions: total,
      }),
    }).catch(() => {});

    // Store result temporarily for result page
    localStorage.setItem("lastQuizResult", JSON.stringify({ course, score: finalScore }));
    clearQuiz();

    router.push("/result");
  }, [answers, questions, total, course, clearQuiz, router]);

  // Timer - 45 minutes total
  useEffect(() => {
    if (!course) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [course, finishQuiz]);

  if (user === undefined) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  if (!course) {
    router.push("/dashboard");
    return null;
  }

  const progress = Math.round(((num + 1) / total) * 100);
  const totalTime = 45 * 60;
  const timerPercent = (timeLeft / totalTime) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const timerColor = timeLeft <= 60 ? "text-red-500" : timeLeft <= 5 * 60 ? "text-orange-500" : "text-blue-600";
  const timerBg = timeLeft <= 60 ? "from-red-500 to-red-600" : timeLeft <= 5 * 60 ? "from-orange-400 to-orange-500" : "from-blue-500 to-purple-500";

  const selectOption = (option) => {
    setAnswers({ ...answers, [num]: option });
  };

  const goNext = () => {
    if (isLast) {
      finishQuiz();
      return;
    }
    setNum(num + 1);
  };

  const goBack = () => {
    if (!isFirst) setNum(num - 1);
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{course} Quiz</span>
          <span className="text-sm font-semibold text-blue-600">{num + 1} / {total}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
            timeLeft <= 60 ? "bg-red-50 border-red-200" : timeLeft <= 5 * 60 ? "bg-orange-50 border-orange-200" : "bg-blue-50 border-blue-200"
          }`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            <span className={`text-sm font-bold tabular-nums ${timerColor}`}>
              {timerDisplay}
            </span>
          </div>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${timerBg} rounded-full transition-all duration-1000 ease-linear`}
              style={{ width: `${timerPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-8">
            <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-bold flex items-center justify-center">
              {num + 1}
            </span>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed">
              {questions[num].question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {questions[num].options.map((option, index) => {
              const isSelected = answers[num] === option;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => selectOption(option)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/50 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 bg-gray-50/50"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
                  }`}>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-gray-700">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              disabled={isFirst}
              className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                isFirst
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-2 border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50"
              }`}
              onClick={goBack}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <button
              disabled={!answers[num]}
              className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                answers[num]
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              onClick={goNext}
            >
              {isLast ? "Finish" : "Next"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
