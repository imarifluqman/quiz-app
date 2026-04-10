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
      {/* Video Modal Overlay */}
      {video && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setVideo("")}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:scale-110 transition-all duration-200 font-bold text-lg"
              onClick={() => setVideo("")}
            >
              X
            </button>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <VideoComponent data={video} />
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-10 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-blue-200 text-sm font-medium tracking-widest uppercase mb-2">Course Playlist</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Learn {params.courseVideos}
            </h1>
            <div className="mt-4 w-16 h-1 bg-white/40 mx-auto rounded-full"></div>
            {data && (
              <p className="text-blue-100 mt-4 text-sm">{data.length} videos available</p>
            )}
          </div>
        </div>

        {/* Video Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {data ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((v, i) => (
                <div
                  key={i}
                  onClick={() => setVideo(v.snippet.resourceId.videoId)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      width={400}
                      height={225}
                      src={v.snippet.thumbnails.standard.url}
                      alt={v.snippet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                        <svg className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                        {v.snippet.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
              <Loader />
              <p className="text-gray-400 text-sm animate-pulse">Loading videos...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
