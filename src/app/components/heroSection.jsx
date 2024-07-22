"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import hero1 from "../../../public/heroImages/hero1.png";
import hero2 from "../../../public/heroImages/hero2.jpg";
import hero3 from "../../../public/heroImages/hero3.jpg";
import hero4 from "../../../public/heroImages/hero4.png";

function HeroSection() {
  let img = [hero1, hero2, hero3, hero4];
  let [num, setNum] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setNum(num + 1);
      if (num === img.length - 1) {
        setNum(0);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [num]);

  return (
    <>
      <div className="w-[100%] lg:h-[90vh] sm:h-[90vh] ">
        <Image
          className="w-[100%] lg:h-[90vh] sm:h-[90vh]"
          src={img[num]}
          alt="Hero Image"
        />
      </div>
    </>
  );
}

export default HeroSection;
