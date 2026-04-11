"use client";
import { useFormik } from "formik";
import { loginSchema } from "../components/schemas";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/loader/Loader";
import Link from "next/link";
import { useAuth } from "../components/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  let [apiError, setApiError] = useState("");
  let [submitting, setSubmitting] = useState(false);
  let router = useRouter();

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setApiError("");
        setSubmitting(true);
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const data = await res.json();

          if (res.ok) {
            login(data);
            router.push(data.role === "admin" ? "/admin/dashboard" : "/dashboard");
          } else {
            setApiError(data.error || "Login failed");
          }
        } catch {
          setApiError("Something went wrong. Please try again.");
        } finally {
          setSubmitting(false);
        }
      },
    });

  useEffect(() => {
    if (user) router.push(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
  }, [user, router]);

  if (user === undefined || user) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const fields = [
    { name: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
    { name: "password", label: "Password", placeholder: "Enter your password", type: "password" },
  ];

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Login to continue your quiz journey</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {apiError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <input
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
                    errors[field.name] && touched[field.name]
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200 bg-gray-50 hover:bg-white"
                  }`}
                  type={field.type}
                  placeholder={field.placeholder}
                  id={field.name}
                  name={field.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[field.name]}
                />
                {errors[field.name] && touched[field.name] && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">{errors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="text-right -mt-2">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg mt-2 disabled:opacity-60"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
