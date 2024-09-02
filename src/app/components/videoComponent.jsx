function VideoComponent({ data }) {
  return (
    <>
      <iframe
        className="w-[auto]"
        width="660"
        height="415"
        src={`https://www.youtube.com/embed/${data}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
}

export default VideoComponent;
