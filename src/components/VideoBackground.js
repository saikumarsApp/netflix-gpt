import { useEffect } from "react";
import { API_OPTION } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  const dispatch = useDispatch();
  const getTrailerVideo = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTION
      );
      const json = await data.json();

      // ✅ Protect against undefined
      if (!json.results || json.results.length === 0) {
        console.warn("No trailer found for movie:", movieId);
        return;
      }

      const filteredData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filteredData.length ? filteredData[0] : json.results[0];

      dispatch(addTrailerVideo(trailer));
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  useEffect(() => {
    getTrailerVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-screen aspect-video -z-10">
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&enablejsapi=1&controls=1&loop=1&playlist=${trailerVideo?.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};
export default VideoBackground;
