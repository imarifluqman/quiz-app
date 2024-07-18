"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
export default function Nav() {
  const router = useRouter();

  function logOut(params) {
    localStorage.clear();
    router.push("/");
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
      <button
        className="text-white bg-green-600 py-2 px-4 rounded font-bold"
        onClick={() => logOut()}
      >
        LogOut
      </button>
    </nav>
  );
}
