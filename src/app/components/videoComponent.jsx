function VideoComponent({ data }) {
  return (
    <>
      <iframe
        // className="w-[100%] h-[415px]"
        width="660"
        height="415"
        src={data}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
}

export default VideoComponent;
