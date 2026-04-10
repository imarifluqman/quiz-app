"use client";
import quiz from "../components/quiz.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/loader/Loader";

export default function Question() {
  let [user, setUser] = useState({});
  let [num, setNum] = useState(0);
  let [selected, setSelected] = useState("");
  let [score, setScore] = useState(0);
  let [nextBtn, setNextBtn] = useState(false);
  let [loading, setLoading] = useState(true);
  const router = useRouter();

  function fetchData() {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
      router.push("/");
    } else if (data.course === undefined) {
      router.push("/course");
    } else {
      setUser(data);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [router]);

  let { course } = user;

  const checkedQuestion = (e) => {
    if (e.target.value === quiz[course][num].correctAnswer) {
      setScore(score + 1);
    }
    setSelected(e);
    setNextBtn(true);
  };

  const nextQuestion = () => {
    if (num === quiz[course].length - 1) {
      localStorage.setItem(
        "data",
        JSON.stringify({
          ...user,
          score: Math.round((score / quiz[course].length) * 100),
        })
      );
      router.push("/result");
      return;
    }
    setNum(num + 1);
    selected.target.checked = false;
    setNextBtn(false);
  };

  const total = course ? quiz[course].length : 0;
  const progress = total ? Math.round(((num + 1) / total) * 100) : 0;
  const isLast = course && num === quiz[course].length - 1;

  return (
    <>
      {loading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl">
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{course} Quiz</span>
              <span className="text-sm font-semibold text-blue-600">{num + 1} / {total}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-8">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-bold flex items-center justify-center">
                  {num + 1}
                </span>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed">
                  {quiz[course][num].question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {quiz[course][num].options.map((option, index) => {
                  const optionId = `q${num}-opt${index}`;
                  return (
                    <label
                      key={index}
                      htmlFor={optionId}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        nextBtn
                          ? "cursor-default opacity-80"
                          : "hover:border-blue-300 hover:bg-blue-50/50"
                      } ${
                        selected?.target?.value === option
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-100 bg-gray-50/50"
                      }`}
                    >
                      <input
                        className="w-4 h-4 accent-blue-600"
                        onClick={(e) => checkedQuestion(e)}
                        type="radio"
                        value={option}
                        id={optionId}
                        name="option"
                        disabled={nextBtn}
                      />
                      <span className="text-sm sm:text-base font-medium text-gray-700">
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-8">
                <button
                  disabled={!nextBtn}
                  className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    nextBtn
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => nextQuestion()}
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
      )}
    </>
  );
}
