"use client";
import quiz from "../components/quiz.json";
import Nav from "../components/Nav";
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
  }, []);

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
      {!loading ? <Nav /> : null}
      <div className="flex justify-center items-center w-full h-[100vh]">
        {loading ? (
          <Loader />
        ) : (
          <div className="sm:w-50 lg:w-1/2 w-[90%] h-[500px] mx-auto my-4 p-4 rounded-lg  bg-slate-100 relative">
            <h1 className="text-2xl ">
              Question# {num + 1} : {quiz[course][num].question}
            </h1>

            <div className="my-8">
              {quiz[course][num].options.map((option, index) => {
                return (
                  <div className="my-2 flex items-center" key={index}>
                    <input
                      className="lg:w-4 sm:w-4 w-4 h-4 lg:h-4 sm:h-4"
                      onClick={(e) => checkedQuestion(e)}
                      type="radio"
                      value={option}
                      id={index}
                      name="option"
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
              // style={{ background: nextBtn ? "rgb(59 130 246)" : "gray" }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-5 right-5"
              onClick={() => nextQuestion()}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
