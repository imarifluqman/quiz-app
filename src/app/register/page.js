"use client";
import { useFormik } from "formik";
import { schema } from "../components/schemas";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/loader/Loader";

export default function Registor() {
  let [isLoading, setLoading] = useState(true);
  let router = useRouter();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      router.push("/course");
    } else {
      setLoading(false);
    }
  }, []);

  let initialValues = {
    name: "",
    fatherName: "",
    email: "",
    phone: "",
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: schema,
      onSubmit: (values, { resetForm }) => {
        localStorage.setItem("data", JSON.stringify(values));
        router.push("/course");
        resetForm();
      },
    });

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const fields = [
    { name: "name", label: "Full Name", placeholder: "Enter your name", type: "text" },
    { name: "fatherName", label: "Father Name", placeholder: "Enter father name", type: "text" },
    { name: "email", label: "Email Address", placeholder: "you@example.com", type: "email" },
    { name: "phone", label: "Phone Number", placeholder: "03XXXXXXXXX", type: "text" },
  ];

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500">Register to start your quiz journey</p>
          <div className="mt-4 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
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

            <button
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg mt-2"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
  