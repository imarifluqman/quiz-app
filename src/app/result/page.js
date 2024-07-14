"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import Certificate from "../../../public/Certificate.png";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/loader/Loader";
export default function Page(params) {
  let [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const pdfRef = useRef();

  let [data, setData] = useState({});

  useEffect(() => {
    let fetchData = JSON.parse(localStorage.getItem("data"));

    if (fetchData === null) {
      router.push("/");
    } else {
      setLoading(false);
    }

    setData(fetchData);
  }, [router]);

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // new jsPDF("l", "mm", "a4", true);
      // l stand for landscape, p for portrait
      // mm stand for millimeters, in for inches
      // a4 stand for A4 page size
      const pdf = new jsPDF("l", "mm", "a4", true);
      console.log(pdf);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "png",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`GIAIC-${data.name}.pdf`);
    });
  };

  return (
    <>
      <div
        ref={pdfRef}
        className=" w-[100%] h-[100vh] flex justify-center items-center"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="w-[70%] h-[100%] mx-auto">
              <Image
                className=" relative  top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%] "
                src={Certificate}
                width={1200}
                height={1200}
                priority={true}
                alt="Governor Sindh certificate Image"
              />

              <p className="absolute top-[150px] right-[350px]  text-[12px] z-1 text-black  ">
                {data.rollNo}
              </p>

              <p className="absolute top-[290px] right-[50%] translate-x-[50%] translate-y-[-50%] text-3xl text-bold z-1 text-black  ">
                {data.name}
              </p>

              <p className="absolute bottom-[235px] right-[580px]  uppercase text-1xl text-bold z-1 text-black  ">
                {data.course}
              </p>
              <p className="absolute bottom-[235px] right-[400px] text-1xl text-bold z-1 text-black  ">
                {data.score}%
              </p>
            </div>
          </>
        )}
      </div>
      <button
        className="bg-green-600 text-white p-2 mt-6 mx-auto block z-10"
        onClick={downloadPdf}
      >
        Download your Certificate
      </button>
    </>
  );
}
