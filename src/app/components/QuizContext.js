"use client";
import { createContext, useContext, useState, useEffect } from "react";

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [quizProgress, setQuizProgress] = useState({});

  // Load quiz state from localStorage on mount
  useEffect(() => {
    const savedCourse = localStorage.getItem("currentCourse");
    const savedProgress = localStorage.getItem("quizProgress");

    if (savedCourse) setCurrentCourse(savedCourse);
    if (savedProgress) {
      try {
        setQuizProgress(JSON.parse(savedProgress));
      } catch {
        setQuizProgress({});
      }
    }
  }, []);

  const startQuiz = (course) => {
    setCurrentCourse(course);
    localStorage.setItem("currentCourse", course);
    // Clear any previous progress for this course
    const newProgress = { ...quizProgress };
    delete newProgress[course];
    setQuizProgress(newProgress);
    localStorage.setItem("quizProgress", JSON.stringify(newProgress));
  };

  const saveProgress = (course, data) => {
    const newProgress = {
      ...quizProgress,
      [course]: { ...data, lastUpdated: Date.now() },
    };
    setQuizProgress(newProgress);
    localStorage.setItem("quizProgress", JSON.stringify(newProgress));
  };

  const clearQuiz = () => {
    setCurrentCourse(null);
    localStorage.removeItem("currentCourse");
  };

  const clearProgress = (course) => {
    const newProgress = { ...quizProgress };
    delete newProgress[course];
    setQuizProgress(newProgress);
    localStorage.setItem("quizProgress", JSON.stringify(newProgress));
  };

  const clearAllProgress = () => {
    setQuizProgress({});
    localStorage.removeItem("quizProgress");
  };

  return (
    <QuizContext.Provider
      value={{
        currentCourse,
        quizProgress,
        startQuiz,
        saveProgress,
        clearQuiz,
        clearProgress,
        clearAllProgress,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return context;
}
