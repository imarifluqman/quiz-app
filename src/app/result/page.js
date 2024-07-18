"use client";
import { IoMdDownload } from "react-icons/io";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import Nav from "../components/Nav";
import certificatBase64 from "../components/base64";

export default function Page(params) {
  let [isLoading, setLoading] = useState(true);
  const router = useRouter();
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
    const pdf = new jsPDF("l", "mm", "a4", true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(certificatBase64, "png", 0, 0, pdfWidth, pdfHeight);
    pdf.text(data.rollNo, 230, 63);
    pdf.text(data.course.toUpperCase(), 150, 128);
    pdf.text(data.score.toString() + "%", 220, 128);
    pdf.setFontSize(25);
    pdf.setTextColor("#588157");
    const textWidth = pdf.getTextWidth(data.name);
    const xPosition = (pdfWidth - (textWidth + 20)) / 2;
    pdf.text(data.name.toUpperCase(), xPosition, 108);
    pdf.save(`INFINITI-${data.name}.pdf`);
  };

  return (
    <div className=" w-[100%] h-[100vh]">
      <Nav />
      {isLoading ? (
        <div className=" w-[100%] h-[100vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-[100%] h-[90vh] flex justify-center mt-10">
          <div className="w-[380px] h-[300px] bg-slate-100 p-6 rounded-lg">
            <p className="text-3xl text-center font-bold text-green-600">
              Congratulations😊
            </p>
            <hr className="w-[100%] my-4 border-green-600" />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-1xl font-bold">Name : </p>
                <p className="text-1xl font-bold">Roll No : </p>
                <p className="text-1xl font-bold">Course : </p>
                <p className="text-1xl font-bold ">Your Score :</p>
              </div>
              <div>
                <p className="text-1xl font-bold">{data.name}</p>
                <p className="text-1xl font-bold"> {data.rollNo}</p>
                <p className="text-1xl font-bold">
                  {data.course.toUpperCase()}
                </p>
                <p className="text-1xl font-bold ">{data.score}%</p>
              </div>
            </div>

            <button
              className="bg-green-600 text-white px-2 py-1 mx-auto block mt-5 rounded flex justify-center items-center"
              onClick={downloadPdf}
            >
              <IoMdDownload className="mr-2" />
              Download Certificate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
