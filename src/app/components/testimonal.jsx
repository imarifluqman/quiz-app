"use client";
import Image from "next/image";
import Next from "../../../public/icons/Nextjs.png";
import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
function Testimonal(params) {
  let [isShow, setIsShow] = useState(false);
  return (
    <div className="w-[100%]  mt-4 p-4">
      {isShow && (
        <div className="lg:w-[40%] sm:w-[60%] w-[90%] z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
          <div className="flex justify-between items-center">
            <p className="text-1xl bold my-2">💕 Add your Opinion 👨</p>
            <button onClick={() => setIsShow(!isShow)}>
              <FaWindowClose className="text-3xl text-green-600" />
            </button>
          </div>
          <form action="">
            <input
              type="text"
              placeholder="Name"
              className="w-[100%] border rounded p-2 mb-1"
            />
            <textarea
              name="opinion"
              id="opinion"
              cols="30"
              rows="10"
              placeholder="Add your opinion"
              className="w-[100%] border rounded p-2"
            ></textarea>
            <label htmlFor="img" className="block my-1">
              Upload your Image
            </label>
            <input type="file" id="img" className=" " />

            <button className="text-[14px]  mx-auto block text-white bg-green-600 p-2 rounded  hover:bg-white hover:text-green-600 hover:border-green-600 hover:border">
              Submit
            </button>
          </form>
        </div>
      )}

      <div className="flex justify-between align-items-center py-4  border-b-2">
        <p className="text-1xl">💕 Testimonals 👨‍⚖️</p>
        <button
          onClick={() => setIsShow(!isShow)}
          className="text-[14px] mr-2 text-white bg-green-600 p-2 rounded  hover:bg-white hover:text-green-600 hover:border-green-600 hover:border"
        >
          Add Testimonial
        </button>
      </div>

      <div className="lg:w-[400px] w-[95%] mx-auto mt-6">
        <div className="border rounded m-2 p-4 flex justify-center items-center  bg-slate-100">
          <div className="w-[30%] mr-4">
            <Image
              src={Next}
              alt="News and Blogs"
              width={100}
              height={100}
              className="rounded-full "
            />
            <p className="text-[14px] mt-2 text-center">Arif Luqman</p>
          </div>
          <div className="w-[70%] ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis est fuga ullam qui dicta quas accusantium odit,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonal;
