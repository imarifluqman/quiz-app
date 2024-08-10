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

  function fetchData(params) {
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

  return (
    <>
      {loading ? (
        <div className="w-[100%] h-[100vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className=" w-full ">
          <div className="sm:w-50 lg:w-1/2 w-[90%] h-[500px] mx-auto my-4 p-4 rounded-lg  bg-slate-100 relative">
            <p className="lg:text-2xl sm:text-2xl text-[20px] font-bold">
              <span className="text-green-600"> Question# {num + 1}</span> :{" "}
              {quiz[course][num].question}
            </p>

            <div className="my-8">
              {quiz[course][num].options.map((option, index) => {
                return (
                  <div className="my-2 flex items-center" key={index}>
                    <input
                      className="lg:w-4 sm:w-4 w-4 h-4 lg:h-4 sm:h-4"
                      onClick={(e) => {
                        checkedQuestion(e);
                      }}
                      type="radio"
                      value={option}
                      id={index}
                      name="option"
                      disabled={nextBtn}
                    />
                    <label
                      className="hover:bg-slate-300 font-bold text-lg lg:w-[90%] sm:w-[90%]  block w-[90%] py-1 px-4 rounded cursor-pointer m-2"
                      htmlFor={index}
                    >
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>

            <button
              disabled={!nextBtn}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded absolute bottom-5 right-5"
              onClick={() => nextQuestion()}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
