"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { FaWindowClose, FaQuoteLeft } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";

function Testimonal() {
  const { user } = useAuth();
  const [isShow, setIsShow] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user) setName(user.name || "");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, text }),
      });
      const data = await res.json();

      if (res.ok) {
        setTestimonials([data, ...testimonials]);
        setText("");
        setSuccess(true);
        setTimeout(() => {
          setIsShow(false);
          setSuccess(false);
        }, 2000);
      } else {
        setApiError(data.error || "Something went wrong");
      }
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-3xl">{"\u2713"}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-800">Thank You!</h4>
                <p className="text-gray-500 text-sm mt-1">Your testimonial has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {apiError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                    {apiError}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
                />
                <textarea
                  rows="5"
                  placeholder="Write your testimonial... (min 10 characters)"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  minLength={10}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            )}
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

        {/* Testimonial Slider */}
        {testimonials.length === 0 ? (
          <div className="max-w-4xl mx-auto text-center py-12">
            <p className="text-gray-400 text-lg">No testimonials yet. Be the first to share your story!</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
              }}
              pagination={{ clickable: true }}
              navigation={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={testimonials.length > 2}
              className="testimonial-swiper !pb-12"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t._id}>
                  <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                    <FaQuoteLeft className="text-3xl text-blue-100 group-hover:text-blue-200 transition-colors duration-300 mb-4" />
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                      {t.text}
                    </p>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold uppercase">
                        {t.name?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{t.name}</h4>
                        <p className="text-xs text-gray-400">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-100 transition-colors duration-300 pointer-events-none"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Share Your Story Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              if (!user) {
                Swal.fire({
                  icon: "warning",
                  title: "Login Required",
                  text: "Please login to share your story",
                  confirmButtonColor: "#3b82f6",
                });
                return;
              }
              setIsShow(true);
            }}
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
