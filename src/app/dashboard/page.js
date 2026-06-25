"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdDownload } from "react-icons/io";
import {
  MdQuiz,
  MdCheckCircle,
  MdTrendingUp,
  MdDashboard,
  MdPlayArrow,
  MdMenu,
  MdClose,
} from "react-icons/md";
import Loader from "../components/loader/Loader";
import { useAuth } from "../components/AuthContext";
import { useQuiz } from "../components/QuizContext";
import { generateCertificate } from "../components/generateCertificate";
import quiz from "../components/quiz.json";

const courseIcons = {
  html: "H",
  css: "C",
  javascript: "JS",
  typescript: "TS",
};

const courseColors = [
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
  "from-yellow-500 to-orange-500",
  "from-blue-600 to-indigo-600",
];

export default function Dashboard() {
  const { user } = useAuth();
  const { startQuiz } = useQuiz();
  const router = useRouter();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetch("/api/quiz/attempts")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setAttempts(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

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

  if (user.role === "admin") {
    router.push("/admin/dashboard");
    return null;
  }

  const totalAttempts = attempts.length;
  const passedCount = attempts.filter((a) => a.score >= 50).length;
  const avgScore =
    totalAttempts > 0
      ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / totalAttempts)
      : 0;

  const stats = [
    {
      label: "Total Quizzes",
      value: totalAttempts,
      icon: <MdQuiz className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Passed",
      value: passedCount,
      icon: <MdCheckCircle className="text-2xl" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Avg Score",
      value: `${avgScore}%`,
      icon: <MdTrendingUp className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const sidebarItems = [
    { key: "overview", label: "Overview", icon: <MdDashboard className="text-xl" /> },
    { key: "quizzes", label: "Quizzes", icon: <MdQuiz className="text-xl" /> },
  ];

  function handleStartQuiz(key) {
    startQuiz(key);
    router.push("/questions");
  }

  const quizKeys = Object.keys(quiz);

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 z-50 md:hidden w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        {sidebarOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
      </button>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-16 z-40 md:z-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Profile in Sidebar */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold uppercase">
              {user.name?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === item.key
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto w-full">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Profile Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold uppercase">
                  {user.name?.charAt(0)}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
                  <p className="text-white/80 text-sm">{user.email}</p>
                  {user.phone && (
                    <p className="text-white/70 text-xs mt-0.5">{user.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center"
                >
                  <div
                    className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white`}
                  >
                    {stat.icon}
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quiz History */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">Quiz History</h2>

              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader />
                </div>
              ) : attempts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                  <p className="text-gray-500 mb-4">
                    You haven&apos;t attempted any quizzes yet.
                  </p>
                  <button
                    onClick={() => setActiveTab("quizzes")}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
                  >
                    Take a Quiz
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {attempts.map((attempt) => {
                    const passed = attempt.score >= 50;
                    return (
                      <div
                        key={attempt._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                              passed
                                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                : "bg-gradient-to-r from-orange-500 to-red-500"
                            }`}
                          >
                            {attempt.score}%
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {attempt.course?.toUpperCase()}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>
                                {new Date(attempt.attemptedAt).toLocaleDateString()}
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                  passed
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {passed ? "PASS" : "FAIL"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {passed && (
                          <button
                            onClick={() =>
                              generateCertificate({
                                name: user.name,
                                course: attempt.course,
                                score: attempt.score,
                              })
                            }
                            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-sm"
                          >
                            <IoMdDownload className="text-base" />
                            Certificate
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "quizzes" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Available Quizzes
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Choose a topic to test your knowledge
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {quizKeys.map((key, index) => {
                const courseAttempts = attempts.filter((a) => a.course === key);
                const bestScore =
                  courseAttempts.length > 0
                    ? Math.max(...courseAttempts.map((a) => a.score))
                    : null;

                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${courseColors[index % courseColors.length]} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                      >
                        {courseIcons[key] || key.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 uppercase">
                          {key}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {quiz[key].length} questions
                        </p>
                        {bestScore !== null && (
                          <p className="text-xs text-gray-500 mt-1">
                            Best: <span className={`font-semibold ${bestScore >= 50 ? "text-green-600" : "text-orange-500"}`}>{bestScore}%</span>
                            <span className="text-gray-400 ml-1">
                              ({courseAttempts.length} {courseAttempts.length === 1 ? "attempt" : "attempts"})
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartQuiz(key)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-sm"
                    >
                      <MdPlayArrow className="text-lg" />
                      {courseAttempts.length > 0 ? "Retake Quiz" : "Start Quiz"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
