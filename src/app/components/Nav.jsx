"use client";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  // { label: "Quiz", href: "/register" },
];

export default function Nav(props) {
  let [data, setData] = useState(null);
  let [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let xyz = JSON.parse(localStorage.getItem("data"));
    setData(xyz);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const signOut = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <Image
            src={logo}
            width={40}
            height={40}
            priority={true}
            alt="Infinity Code Logo"
            className="group-hover:scale-105 transition-transform duration-200"
          />
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
            Infinity Code
          </span>
        </a>

        {/* Nav Links + Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Links */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* User Info */}
          {data ? (
            <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold uppercase">
                {data.name?.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline max-w-[100px] truncate">
                {data.name}
              </span>
              <button
                onClick={signOut}
                title="Sign Out"
                className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
              >
                <LiaSignOutAltSolid className="text-xl" />
              </button>
            </div>
          ) : (
            !props.data && (
              <button
                onClick={() => router.push("/register")}
                className="ml-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                Start Quiz
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
