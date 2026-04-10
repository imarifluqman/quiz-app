"use client";
import Image from "next/image";
import Next from "../../../public/icons/Nextjs.png";
import { useState } from "react";
import { FaWindowClose, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Arif Luqman",
    role: "Full Stack Developer",
    image: Next,
    text: "This platform transformed my learning journey. The quizzes helped me solidify my understanding of web technologies, and the certificates gave me confidence to apply for jobs.",
  },
  {
    name: "Arif Luqman",
    role: "Frontend Engineer",
    image: Next,
    text: "The curated video playlists and interactive quizzes make learning so much more engaging. I went from beginner to building real projects in just a few weeks.",
  },
];

function Testimonal() {
  let [isShow, setIsShow] = useState(false);

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-white to-slate-50">
      {/* Modal Overlay */}
      {isShow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setIsShow(false)}
        >
          <div
            className="w-[90%] sm:w-[500px] bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Share Your Experience</h3>
                <p className="text-sm text-gray-400 mt-1">We&apos;d love to hear from you</p>
              </div>
              <button onClick={() => setIsShow(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <FaWindowClose className="text-2xl" />
              </button>
            </div>
            <form action="">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
              />
              <textarea
                name="opinion"
                id="opinion"
                rows="5"
                placeholder="Write your testimonial..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition resize-none"
              ></textarea>
              <label htmlFor="img" className="block text-sm text-gray-500 mb-1">
                Upload your photo
              </label>
              <input type="file" id="img" className="text-sm text-gray-500 mb-4 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" />
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            What Our Learners Say
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Real stories from students who transformed their careers
          </p>
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-3xl text-blue-100 group-hover:text-blue-200 transition-colors duration-300 mb-4" />

              {/* Testimonial Text */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                {t.text}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>

              {/* Decorative gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-100 transition-colors duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Add Testimonial Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setIsShow(true)}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105"
          >
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonal;
