import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_OPTION } from "../utils/constants";
import Shimmer from "./Shimmer";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  // Fetch movie details
  const fetchMovieDetails = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      API_OPTION
    );
    const data = await res.json();
    setMovie(data);
  };

  // Fetch movie trailer
  const fetchTrailer = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTION
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const trailer =
        data.results.find((v) => v.type === "Trailer") || data.results[0];
      setTrailerKey(trailer.key);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchTrailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <Shimmer />
      </div>
    );
  }

  // Join languages and genres
  const languages =
    movie?.spoken_languages?.map((lang) => lang.english_name).join(" | ") ||
    "N/A";
  const genres = movie?.genres?.map((g) => g.name).join(", ") || "N/A";

  return (
    <div className="flex flex-col bg-black min-h-screen text-white overflow-hidden overscroll-none pt-0">
      {/* Trailer */}
      <div className="w-full md:w-full pr-4">
        {trailerKey ? (
          <iframe
            className="w-screen aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="p-4">No trailer available</p>
        )}
      </div>

      {/* Movie Details */}
      <div className="md:absolute md:pt-[25%] pl-10 pr-6 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

        <p className="mb-4 text-sm text-gray-300">{movie.overview}</p>

        {movie.vote_average && (
          <p className="text-white text-sm font-semibold mb-2">
            ⭐ Rating: <span>{movie.vote_average.toFixed(1)}</span>
          </p>
        )}

        <p className="mb-2">
          <span className="font-semibold">Release Date:</span>{" "}
          {movie.release_date}
        </p>

        <p className="mb-2">
          <span className="font-semibold">Languages:</span> {languages}
        </p>

        <p className="mb-2">
          <span className="font-semibold">Genres:</span> {genres}
        </p>

        {movie.runtime && (
          <p className="mb-4">
            <span className="font-semibold">Runtime:</span> {movie.runtime} mins
          </p>
        )}

        <button
          onClick={() => navigate("/browse")}
          className="bg-gray-900 text-white hover:bg-red-700 px-6 py-2 rounded-lg font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
