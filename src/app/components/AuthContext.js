"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = loading, null = no user, object = logged in

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          const local = JSON.parse(localStorage.getItem("data"));
          setUser(local ? { ...data, ...local } : data);
        } else {
          localStorage.removeItem("data");
          setUser(null);
        }
      })
      .catch(() => {
        localStorage.removeItem("data");
        setUser(null);
      });
  }, []);

  const login = (userData) => {
    localStorage.setItem("data", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    localStorage.clear();
    setUser(null);
  };

  const updateUser = (newData) => {
    localStorage.setItem("data", JSON.stringify(newData));
    setUser(newData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
