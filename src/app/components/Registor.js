"use client";
import Image from "next/image";
import logo from "../../../public/Logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./loader/Loader";
export default function Registor() {
  let [reg, setReg] = useState({
    name: "",
    email: "",
    rollNo: "",
  });

  let [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("data") !== null) {
      router.push("/course");
    }
    setLoading(false);
  }, [router]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validEmail = validateEmail(reg.email);
    if (
      reg.name === "" ||
      reg.name.length < 3 ||
      !validEmail ||
      reg.rollNo === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    localStorage.setItem("data", JSON.stringify(reg));
    router.push("/course");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-start items-center flex-col sm:w-full lg:w-full w-full h-[100vh] mx-auto  pt-16 rounded-lg  bg-slate-100  "
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Image
            className="w-auto h-auto"
            src={logo}
            // width={100}
            // height={100}
            priority={true}
            alt="Infinity code Logo Image"
          />

          <h1 className="text-1xl sm:text-2xl lg:text-4xl text-green-600   drop-shadow-lg	">
            Welcome to the INFINITY CODE Quiz App
          </h1>
          <p className=" text-green-600 my-4">Please Register Yourself</p>
          <input
            className=" w-[80%] lg:w-[400px] sm:w-[400px] my-2 p-2 rounded drop-shadow-md focus:outline-green-800 active:outline-green-800"
            type="text"
            placeholder="Enter your Full Name"
            onChange={(e) => setReg({ ...reg, name: e.target.value })}
          />
          <input
            className="w-[80%]  lg:w-[400px] sm:w-[400px] my-2 p-2 rounded drop-shadow-md focus:outline-green-800 active:outline-green-800"
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={(e) => setReg({ ...reg, email: e.target.value })}
          />
          <input
            className=" w-[80%]  lg:w-[400px] sm:w-[400px] my-2 p-2 rounded  drop-shadow-md focus:outline-green-800 active:outline-green-800"
            type="text"
            placeholder="Enter your Roll Number"
            name="rollNo"
            onChange={(e) => setReg({ ...reg, rollNo: e.target.value })}
          />

          <input
            className="bg-green-400  my-2 p-2 rounded text-white  drop-shadow-md cursor-pointer hover:bg-green-600 "
            type="submit"
            value="Register"
          />
        </>
      )}
    </form>
  );
}
