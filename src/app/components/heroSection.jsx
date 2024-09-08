"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import hero1 from "../../../public/heroImages/hero1.png";
import hero2 from "../../../public/heroImages/hero2.jpg";
import hero3 from "../../../public/heroImages/hero3.jpg";
import hero4 from "../../../public/heroImages/hero4.png";

function HeroSection() {
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={hero1} alt="hero image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={hero2} alt="hero image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={hero3} alt="hero image" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={hero4} alt="hero image" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default HeroSection;
