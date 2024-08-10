"use client";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useEffect, useState } from "react";
export default function Nav(props) {
  let [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    let xyz = JSON.parse(localStorage.getItem("data"));
    setData(xyz);
  }, []);

  function goToRegister() {
    router.push("/register");
  }

  const signOut = () => {
    localStorage.clear();
    router.push("/");
  };

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
      <div className="flex justify-center items-center">
        {props.data ? null : (
          <button
            className="text-[14px] text-white bg-green-600 p-2 rounded  hover:bg-white hover:text-green-600 hover:border-green-600 hover:border"
            onClick={() => goToRegister()}
          >
            Go to Quiz
          </button>
        )}

        {data ? (
          <>
            <p className="mx-2 text-[12px] text-green-600">{data?.name}</p>

            <div className="flex justify-center items-center flex-col w-[40px]  group/abc	">
              <LiaSignOutAltSolid
                className="text-3xl -rotate-90 text-red-600 hover:text-red-600 cursor-pointer"
                title="Sign Out"
                onClick={signOut}
              />
              <small className="text-[8px] text-red-600 hidden group-hover/abc:inline-block ">
                Sign Out
              </small>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
}
