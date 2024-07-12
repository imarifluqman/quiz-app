"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import quiz from "../components/quiz.json";
import Loader from "../components/loader/Loader";
export default function page(params) {
  let [userData, setuserData] = useState({});
  let [isLoading, setIsLoadin] = useState(true);

  const router = useRouter();



  
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("data")));

  //   if (user === null) {
  //     setLoading(true);
  //     router.push("/");
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);



  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data === null) {
      router.push("/");
    } else {
      setIsLoadin(false);
    }
    setuserData(data);
  }, []);

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
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
