"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
export default function Nav() {
  const router = useRouter();

  function goToRegister() {
    router.push("/register");
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
          className="text-[14px] text-white bg-green-600 p-2 rounded  hover:bg-white hover:text-green-600 hover:border-green-600 hover:border"
          onClick={() => goToRegister()}
        >
          Go to Quiz
        </button>
      </div>
    </nav>
  );
}
