import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const firstMovie = movies[0];
  const { original_title, overview, id } = firstMovie;
  //console.log(firstMovie);
  return (
    <>
      <div className="">
        <VideoTitle title={original_title} disc={overview} />
        <VideoBackground movieId={id} />
      </div>
    </>
  );
};

export default MainContainer;
