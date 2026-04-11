"use client";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { MdMenu, MdClose } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useAuth } from "./AuthContext";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
];

export default function Nav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    setMenuOpen(false);
    router.push("/");
  };

  const handleNav = (href) => {
    setMenuOpen(false);
    router.push(href);
  };

  const dashboardHref = user?.role === "admin" ? "/admin/dashboard" : "/dashboard";
  const isDashboardActive = pathname === "/dashboard" || pathname === "/admin/dashboard";

  return (
    <nav className="sticky top-0 z-40 w-full bg-white shadow-sm">
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
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

          {user && (
            <a
              href={dashboardHref}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isDashboardActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Dashboard
            </a>
          )}

          {user ? (
            <div className="flex items-center gap-2 ml-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold uppercase">
                {user.name?.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                {user.name}
              </span>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
              >
                <LiaSignOutAltSolid className="text-xl" />
              </button>
            </div>
          ) : user === null ? (
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/register")}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                Register
              </button>
            </div>
          ) : null}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          {menuOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-40 md:hidden">
            <div className="px-4 py-3 space-y-1">
              {/* User Info (if logged in) */}
              {user && (
                <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold uppercase">
                    {user.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Nav Links */}
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {user && (
                <button
                  onClick={() => handleNav(dashboardHref)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isDashboardActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Dashboard
                </button>
              )}

              {/* Divider */}
              <div className="h-px bg-gray-100 my-2"></div>

              {/* Auth Actions */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-200"
                >
                  <LiaSignOutAltSolid className="text-lg" />
                  Sign Out
                </button>
              ) : user === null ? (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => handleNav("/login")}
                    className="w-full py-2.5 text-sm font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-300"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNav("/register")}
                    className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
                  >
                    Register
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
