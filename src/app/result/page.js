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
    const pdf = new jsPDF("l", "mm", "a4", true);

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // new jsPDF("l", "mm", "a4", true);
      // l stand for landscape, p for portrait
      // mm stand for millimeters, in for inches
      // a4 stand for A4 page size

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      console.log(pdfWidth, pdfHeight);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "png",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.text(data.rollNo, 230, 63);
      pdf.text(data.name.toUpperCase(), 146, 108);
      pdf.text(data.course.toUpperCase(), 150, 128);
      pdf.text(data.score.toString() + "%", 220, 128);
      pdf.save(`GIAIC-${data.name}.pdf`);
    });
  };

  return (
    <div
      // ref={pdfRef}
      className=" w-[100%] h-[100vh] flex flex-col justify-center  items-center"
    >
      {isLoading ? (
        <div className=" w-[100%] h-[100vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {/* <div className="">
            <p className="">Name : {data.name}</p>
            <p className="">Roll No : {data.rollNo}</p>
            <p className="">Course : {data.course}</p>
            <p className=" "> Your Score :{data.score}%</p>
          </div> */}
          <Image
            ref={pdfRef}
            src={Certificate}
            height={2480}
            width={3508}
            priority={true}
            alt="Governor Sindh certificate Image"
          />
        </>
      )}

      {!isLoading ? (
        <button
          className="bg-green-600 text-white px-2 py-1 mx-auto block mt-1"
          onClick={downloadPdf}
        >
          Download Certificate
        </button>
      ) : null}
    </div>
  );
}
