function VideoComponent({ data }) {
  return (
    <>
      <iframe
        className="w-[350px] h-[250px] lg:w-[660px] lg:h-[415px] sm:w-[660px] sm:h-[415px] mx-auto"
        width="660"
        height="415"
        src={`https://www.youtube.com/embed/${data}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
}

export default VideoComponent;
