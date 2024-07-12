"use client";
import { useState } from "react";
export default function Nav() {
  return (
    <nav className="flex justify-between items-center w-full bg-blue-500 py-2 px-4">
      <p className="text-white">GIAIC Quiz App</p>
      <button className="text-blue-600 bg-white py-2 px-4 rounded font-bold">LogOut</button>
    </nav>
  );
}
