"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MdDashboard,
  MdPeople,
  MdAssessment,
  MdQuiz,
  MdCheckCircle,
  MdTrendingUp,
  MdMenu,
  MdClose,
  MdDelete,
} from "react-icons/md";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../components/AuthContext";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (user === null) router.push("/login");
    if (user && user.role !== "admin") router.push("/dashboard");
  }, [user, router]);

  useEffect(() => {
    if (user && user.role === "admin") {
      Promise.all([
        fetch("/api/admin/users").then((r) => r.json()),
        fetch("/api/admin/attempts").then((r) => r.json()),
      ])
        .then(([usersData, attemptsData]) => {
          if (Array.isArray(usersData)) setUsers(usersData);
          if (Array.isArray(attemptsData)) setAttempts(attemptsData);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (user === undefined || !user || user.role !== "admin") {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const totalUsers = users.length;

  async function handleDeleteUser(userId) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the user and all their quiz attempts.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    setDeleting(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u._id !== userId));
        setAttempts(attempts.filter((a) => a.userId?._id !== userId));
        Swal.fire({ icon: "success", title: "Deleted", text: "User has been deleted.", timer: 1500, showConfirmButton: false });
      }
    } catch {}
    setDeleting(null);
  }
  const totalAttempts = attempts.length;
  const passedCount = attempts.filter((a) => a.score >= 50).length;
  const passRate = totalAttempts > 0 ? Math.round((passedCount / totalAttempts) * 100) : 0;
  const avgScore =
    totalAttempts > 0
      ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / totalAttempts)
      : 0;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: <MdPeople className="text-2xl" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Attempts",
      value: totalAttempts,
      icon: <MdQuiz className="text-2xl" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Pass Rate",
      value: `${passRate}%`,
      icon: <MdCheckCircle className="text-2xl" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Avg Score",
      value: `${avgScore}%`,
      icon: <MdTrendingUp className="text-2xl" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const sidebarItems = [
    { key: "overview", label: "Overview", icon: <MdDashboard className="text-xl" /> },
    { key: "users", label: "Users", icon: <MdPeople className="text-xl" /> },
    { key: "attempts", label: "Attempts", icon: <MdAssessment className="text-xl" /> },
  ];

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
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-bold uppercase">
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
              <p className="text-xs text-orange-600 font-medium">Admin</p>
            </div>
          </div>
        </div>

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
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Admin Banner */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                      <MdDashboard className="text-3xl" />
                    </div>
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold">Admin Dashboard</h1>
                      <p className="text-white/80 text-sm">
                        Welcome back, {user.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
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

                {/* Recent Activity */}
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-3">
                    Recent Quiz Attempts
                  </h2>
                  {attempts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                      <p className="text-gray-500">No quiz attempts yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {attempts.slice(0, 5).map((attempt) => {
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
                                  {attempt.userId?.name || "Unknown User"}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <span>{attempt.course?.toUpperCase()}</span>
                                  <span>-</span>
                                  <span>
                                    {new Date(attempt.attemptedAt).toLocaleDateString()}{" "}
                                    {new Date(attempt.attemptedAt).toLocaleTimeString()}
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
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    All Users
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    {totalUsers} registered {totalUsers === 1 ? "user" : "users"}
                  </p>
                </div>

                {users.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <p className="text-gray-500">No users registered yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {users.map((u) => (
                      <div
                        key={u._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold uppercase shrink-0">
                            {u.name?.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-gray-800">{u.name}</p>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700">
                                STUDENT
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{u.email}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-1 flex-wrap">
                              {u.phone && <span>{u.phone}</span>}
                              {u.fatherName && (
                                <span>Father: {u.fatherName}</span>
                              )}
                              <span>
                                Joined:{" "}
                                {new Date(u.createdAt).toLocaleDateString()}{" "}
                                {new Date(u.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            disabled={deleting === u._id}
                            className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-50"
                            title="Delete user"
                          >
                            <MdDelete className="text-xl" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Attempts Tab */}
            {activeTab === "attempts" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    All Quiz Attempts
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">
                    {totalAttempts} total {totalAttempts === 1 ? "attempt" : "attempts"}
                  </p>
                </div>

                {attempts.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <p className="text-gray-500">No quiz attempts yet.</p>
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
                                {attempt.userId?.name || "Unknown User"}
                              </p>
                              <p className="text-xs text-gray-400">
                                {attempt.userId?.email || ""}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                <span>{attempt.course?.toUpperCase()}</span>
                                <span>-</span>
                                <span>
                                  {new Date(attempt.attemptedAt).toLocaleDateString()}{" "}
                                  {new Date(attempt.attemptedAt).toLocaleTimeString()}
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
                          <div className="text-xs text-gray-400 sm:text-right">
                            <p>{attempt.totalQuestions} questions</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
