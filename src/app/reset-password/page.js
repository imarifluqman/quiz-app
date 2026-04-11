"use client";
import { Suspense } from "react";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../components/schemas";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Loader from "../components/loader/Loader";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: { password: "", confirmPassword: "" },
      validationSchema: resetPasswordSchema,
      onSubmit: async (values) => {
        setApiError("");
        setSubmitting(true);
        try {
          const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password: values.password }),
          });
          const data = await res.json();

          if (res.ok) {
            setSuccess(true);
          } else {
            setApiError(data.error || "Something went wrong");
          }
        } catch {
          setApiError("Something went wrong. Please try again.");
        } finally {
          setSubmitting(false);
        }
      },
    });

  if (!token) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-3xl">{"\u2717"}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Invalid Link</h1>
            <p className="text-gray-500 mb-6">This password reset link is invalid.</p>
            <Link
              href="/forgot-password"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
            >
              Request New Link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-3xl">{"\u2713"}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Password Reset!</h1>
            <p className="text-gray-500 mb-6">Your password has been reset successfully.</p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md"
            >
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Reset Password</h1>
          <p className="text-gray-500">Enter your new password</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {apiError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                New Password
              </label>
              <input
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
                  errors.password && touched.password
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-200 bg-gray-50 hover:bg-white"
                }`}
                type="password"
                placeholder="Min 6 characters"
                id="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-200 bg-gray-50 hover:bg-white"
                }`}
                type="password"
                placeholder="Confirm your password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
