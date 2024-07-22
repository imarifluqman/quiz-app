"use client";
import { useFormik } from "formik";
import { schema } from "../components/schemas";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../components/loader/Loader";
import Nav from "../components/Nav";
import Footer from "../components/footer";
export default function Registor() {
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
        console.log(values);
        resetForm();
      },
    });

  return (
    <div className="w-full ">
      <Nav />

      <div className="w-full py-5">
        <p className="text-2xl text-center mt-5">Please Register Here</p>
        <form
          method="post"
          onSubmit={handleSubmit}
          className=" w-[100%] lg:w-[80%] mx-auto"
        >
          <section className="lg:flex lg:grid lg:grid-cols-2 sm:flex sm:grid sm:grid-cols-2 gap-2  w-[100%] p-5">
            <div className="w-[100%]  border rounded p-2 mt-2">
              <label className="block" htmlFor="name">
                Name
              </label>
              <input
                className="w-[100%] focus:outline-none"
                type="text"
                placeholder="Enter Name "
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name ? (
                <small className="text-red-500 block">{errors.name}</small>
              ) : null}
            </div>
            <div className="w-[100%] border rounded p-2 mt-2">
              <label className="block" htmlFor="fatherName">
                Father Name
              </label>
              <input
                className="w-[100%] focus:outline-none"
                type="text"
                placeholder="Enter Father Name"
                id="fatherName"
                name="fatherName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fatherName}
              />
              {errors.fatherName && touched.fatherName ? (
                <small className="text-red-500 block">
                  {errors.fatherName}
                </small>
              ) : null}
            </div>
            <div className="w-[100%]  border rounded p-2 mt-2">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                className="w-[100%] focus:outline-none"
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email ? (
                <small className="text-red-500 block">{errors.email}</small>
              ) : null}
            </div>
            <div className="w-[100%]  border rounded p-2 mt-2">
              <label className="block" htmlFor="phone">
                Phone
              </label>
              <input
                className="w-[100%] focus:outline-none"
                type="text"
                placeholder="Phone 03xxxxxxx"
                id="phone"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone ? (
                <small className="text-red-500 block">{errors.phone}</small>
              ) : null}
            </div>
          </section>
          <button
            className="bg-green-600 w-[30%] lg:w-[150px] text-white p-2 text-center block mx-auto mt-5"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
