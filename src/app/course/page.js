"use client";

import { UseEffect, UseState } from "react";
import { UseRouter } from "next/navigation";
import quiz from "../components/quiz.json";
export default function page(params) {
  let [userData, setuserData] = UseState({});

  UseEffect(() => {
    setuserData(JSON.parse(localStorage.getItem("data")));
  }, []);

  const router = UseRouter();

  let keys = Object.keys(quiz);

  function handleCourseChange(e) {
    e.preventDefault();
    localStorage.setItem(
      "data",
      JSON.stringify({ ...userData, course: e.target.value })
    );
    router.push("/questions");
  }

  return (
    <div className="w-[100%] h-[100vh] flex flex-wrap justify-center items-center flex-col  gap-4">
      <p className="text-3xl text-green-700 font-bold">Select Course</p>

      {keys.map((key, index) => {
        return (
          <button
            key={index}
            className="bg-slate-200 text-black w-[70%] lg:w-2/5 h-[50px] uppercase rounded-md"
            type="button"
            value={key}
            onClick={(e) => {
              handleCourseChange(e);
            }}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
