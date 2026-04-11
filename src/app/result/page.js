"use client";
import { IoMdDownload } from "react-icons/io";
import { useRouter } from "next/navigation";
import Loader from "../components/loader/Loader";
import { useAuth } from "../components/AuthContext";
import { generateCertificate } from "../components/generateCertificate";

export default function Page() {
  const { user, updateUser } = useAuth();
  const router = useRouter();

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

  const passed = user.score >= 50;

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Top Banner */}
          <div className={`py-8 px-6 text-center ${
            passed
              ? "bg-gradient-to-r from-blue-500 to-purple-600"
              : "bg-gradient-to-r from-orange-500 to-red-500"
          }`}>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-4xl">{passed ? "🎉" : "💪"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {passed ? "Congratulations!" : "Keep Trying!"}
            </h1>
            <p className="text-white/80 text-sm mt-1">
              {passed ? "You passed the quiz" : "You can do better next time"}
            </p>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center -mt-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-lg ${
              passed ? "bg-blue-600 text-white" : "bg-orange-500 text-white"
            }`}>
              {user.score}%
            </div>
          </div>

          {/* Details */}
          <div className="p-6 pt-5 space-y-4">
            {[
              { label: "Name", value: user.name },
              { label: "Course", value: user.course?.toUpperCase() },
              { label: "Score", value: `${user.score}%` },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm font-semibold text-gray-800">{item.value}</span>
              </div>
            ))}

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                onClick={() => generateCertificate({ name: user.name, course: user.course, score: user.score })}
              >
                <IoMdDownload className="text-lg" />
                Download Certificate
              </button>
              <button
                className="w-full py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                onClick={() => {
                  const { course, score, ...rest } = user;
                  updateUser(rest);
                  router.push("/dashboard");
                }}
              >
                Try Another Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
