"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./styles.css";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useRouter } from "next/navigation";
import hero1 from "../../../public/heroImages/hero1.jpg";
import hero2 from "../../../public/heroImages/hero2.jpg";
import hero3 from "../../../public/heroImages/hero3.jpg";
import hero4 from "../../../public/heroImages/hero4.jpg";

const slides = [
  {
    image: hero1,
    title: "Master Web Development",
    subtitle: "Learn HTML, CSS, JavaScript and modern frameworks from industry experts",
  },
  {
    image: hero2,
    title: "Build Real Projects",
    subtitle: "Hands-on courses with practical projects to boost your portfolio",
  },
  {
    image: hero3,
    title: "Test Your Knowledge",
    subtitle: "Take quizzes, track progress, and earn certificates of completion",
  },
  {
    image: hero4,
    title: "Learn at Your Pace",
    subtitle: "Access curated video playlists and study materials anytime, anywhere",
  },
];

function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden">
      <Swiper
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay, EffectFade]}
        className="heroSwiper h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-3xl px-6 sm:px-12 lg:px-20">
                  <div className="w-14 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6"></div>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-xl mb-8 leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => router.push("/register")}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                    >
                      Start Quiz
                    </button>
                    <a
                      href="#courses"
                      className="px-8 py-3 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/70 transition-all duration-300 text-center backdrop-blur-sm"
                    >
                      Browse Courses
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
    </section>
  );
}

export default HeroSection;
