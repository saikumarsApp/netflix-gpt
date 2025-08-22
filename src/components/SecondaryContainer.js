import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <>
        <div className="bg-black">
          <div className="relative pl-5 md:-mt-52 z-20">
            <MoviesList
              title={"Now Playing"}
              movies={movies.nowPlayingMovies}
            />
            <MoviesList title={"Top Rated"} movies={movies.topRatedMovies} />
            <MoviesList title={"Popular"} movies={movies.popularMovies} />
            <MoviesList title={"Upcoming"} movies={movies.upcomingMovies} />
          </div>
        </div>
      </>
    )
  );
};

export default SecondaryContainer;
