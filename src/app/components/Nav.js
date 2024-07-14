"use client";

import { useRouter } from "next/navigation";
export default function Nav() {
  const router = useRouter();

  function logOut(params) {
    localStorage.clear();
    router.push("/");
  }

  return (
    <nav className="flex justify-between items-center w-full bg-blue-500 py-2 px-4">
      <p className="text-white">GIAIC Quiz App</p>
      <button
        className="text-blue-600 bg-white py-2 px-4 rounded font-bold"
        onClick={() => logOut()}
      >
        LogOut
      </button>
    </nav>
  );
}
