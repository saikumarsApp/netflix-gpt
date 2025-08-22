import MovieCard from "./MovieCard";

const MoviesList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <>
      <div className="px-5 py-2">
        <h1 className="text-white text-sm  md:text-2xl py-3">{title}</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
          <div className="flex">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={title}
                imgPath={movie.backdrop_path}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
