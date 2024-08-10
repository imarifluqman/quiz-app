"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { courseData } from "../components/courseData";
import VideoComponent from "../components/videoComponent";

function Page({ params }) {
  let [data, setData] = useState(null);
  let [video, setVideo] = useState(null);
  function abc() {
    for (let index = 0; index < courseData.length; index++) {
      const element = courseData[index];
      if (element.name == params.courseVideos) {
        setData(element);
      }
    }
  }

  useEffect(() => {
    abc();
    return () => {
      abc();
    };
  }, []);

  return (
    <>
      <div className="w-[100vw]">
        <p className="lg:text-3xl sm:text-2xl text-xl text-center p-4 bg-slate-100">
          🤍🤍 Learn {data?.name} 🤍🤍
        </p>
        {video && (
          <div className="w-[100%] flex justify-center">
            <VideoComponent className="mx-auto block" data={video} />
          </div>
        )}

        <div className="w-[100%] flex flex-wrap place-items-top justify-center gap-2 mx-auto py-4">
          {data ? (
            data.video_Url?.map((v, i) => {
              return (
                <div
                  key={i}
                  className="w-[160px] cursor-pointer hover:scale-110 transition"
                >
                  <Image
                    className=""
                    width={170}
                    height={100}
                    src={v.img_url}
                    alt={v.name}
                    onClick={() => {
                      setVideo(v.url);
                    }}
                  />
                  <p className="text-[12px]">{v.name}</p>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
