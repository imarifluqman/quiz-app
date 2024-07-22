"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
export default function Nav() {
  const router = useRouter();

  function HandleRegister(e) {
    console.log(e.target.innerText);
    if (e.target.innerText === "Register") {
      router.push("/register");
    } else {
      localStorage.clear();
      router.push("/");
      setIsRegister(false);
    }
  }

  return (
    <nav className="flex justify-between items-center w-full  py-2 px-4 shadow">
      <Image
        className="w-auto h-auto"
        src={logo}
        width={60}
        height={50}
        priority={true}
        alt="Governor Sindh Logo Image"
      />
      <div>
        <button
          className="text-white bg-green-600 py-2 px-4 rounded font-bold hover:bg-white hover:text-green-600 hover:border-green-600 hover:border"
          onClick={(e) => HandleRegister(e)}
        >
          LogOut
        </button>
      </div>
    </nav>
  );
}
