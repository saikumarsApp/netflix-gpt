import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";
import Shimmer from "./Shimmer";

const GptSearchSuggestions = () => {
  const { suggestedMovieNames, suggestedResult, loading } = useSelector(
    (store) => store.gpt
  );

  if (loading) return <Shimmer />;

  if (!suggestedMovieNames) {
    return null;
  }

  return (
    <div className="bg-black p-4">
      {suggestedMovieNames.map((movieName, index) => (
        <MoviesList
          key={movieName}
          title={movieName}
          movies={suggestedResult[index]}
        />
      ))}
    </div>
  );
};

export default GptSearchSuggestions;
