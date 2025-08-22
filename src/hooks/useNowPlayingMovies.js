import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTION } from "../utils/constants";

const useNowPlayingMovies = () => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const dispatch = useDispatch();
  const nowPlayingMovieList = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();
    //console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    !nowPlayingMovies && nowPlayingMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNowPlayingMovies;
