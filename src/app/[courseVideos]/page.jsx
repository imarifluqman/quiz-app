"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import VideoComponent from "../components/videoComponent";
import Loader from "../components/loader/Loader";

function Page({ params }) {
  let [data, setData] = useState(null);
  let [video, setVideo] = useState("");
  const searchParams = useSearchParams();
  const PLAYLIST_ID = searchParams.get("playlistId");

  // ======================================

  const API_KEY = "AIzaSyDAFnEqdDvue4lRbpiFb4ElWJ26NETHmn8";
  const MAX_RESULTS = 15;
  async function fetchAllPlaylistVideos() {
    let allVideos = [];
    let nextPageToken = "";

    do {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=${MAX_RESULTS}&pageToken=${nextPageToken}&key=${API_KEY}`
      );
      const data = await response.json();
      const items = data.items;
      allVideos = allVideos.concat(items);

      nextPageToken = data.nextPageToken || "";
    } while (nextPageToken);
    return allVideos;
  }

  // ==========================================
  function abc() {
    fetchAllPlaylistVideos().then((data) => {
      setData(data);
    });
  }

  useEffect(() => {
    abc();

    return () => {
      abc();
    };
  }, []);

  return (
    <>
      <div className="w-[100vw] relative">
        {video && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-10">
            <button
              className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] bold bg-white hover:bg-slate-100 text-red-500 text-2xl flex justify-center items-center cursor-pointer rounded-full"
              onClick={() => setVideo("")}
            >
              X
            </button>
            <VideoComponent className="mx-auto block" data={video} />
          </div>
        )}

        <p className="lg:text-3xl sm:text-2xl text-xl text-center p-4 bg-slate-100">
          🤍🤍 Learn {params.courseVideos} 🤍🤍
        </p>

        <div className="w-[100%] flex flex-wrap place-items-top justify-center gap-2 mx-auto py-4">
          {data ? (
            data?.map((v, i) => {
              return (
                <div
                  key={i}
                  className="w-[160px] cursor-pointer hover:scale-110 transition"
                >
                  <Image
                    className=""
                    width={170}
                    height={100}
                    src={v.snippet.thumbnails.standard.url}
                    alt={v.snippet.title}
                    onClick={() => {
                      setVideo(v.snippet.resourceId.videoId);
                    }}
                  />
                  <p className="text-[12px]">{v.snippet.title}</p>
                </div>
              );
            })
          ) : (
            <div className="w-[100%] h-[70vh] flex justify-center items-center">
              <Loader />

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
