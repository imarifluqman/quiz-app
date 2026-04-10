"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import quiz from "../components/quiz.json";
import Loader from "../components/loader/Loader";

const courseIcons = {
  html: "H",
  css: "C",
  javascript: "JS",
  typescript: "TS",
};

export default function Page() {
  let [userData, setuserData] = useState({});
  let [isLoading, setIsLoadin] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
      router.push("/register");
    } else {
      setIsLoadin(false);
    }
    setuserData(data);
  }, [router]);

  let keys = Object.keys(quiz);

  function handleCourseChange(e, key) {
    e.preventDefault();
    localStorage.setItem(
      "data",
      JSON.stringify({ ...userData, course: key })
    );
    router.push("/questions");
  }

  const colors = [
    "from-orange-500 to-red-500",
    "from-blue-500 to-cyan-500",
    "from-yellow-500 to-orange-500",
    "from-blue-600 to-indigo-600",
  ];

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-lg">
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Select a Quiz</h1>
              <p className="text-gray-500">Choose a topic to test your knowledge</p>
              <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Course Cards */}
            <div className="space-y-4">
              {keys.map((key, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => handleCourseChange(e, key)}
                  className="group w-full flex items-center gap-4 bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-left"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center text-white font-bold text-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {courseIcons[key] || key.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 uppercase group-hover:text-blue-600 transition-colors duration-200">
                      {key}
                    </h3>
                    <p className="text-sm text-gray-400">{quiz[key].length} questions</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
