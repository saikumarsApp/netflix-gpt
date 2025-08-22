import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTION } from "../utils/constants";
import { addGptMovies, startLoading, stopLoading } from "../utils/gptSlice";

const GptSearchBar = () => {
  const changeLang = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const movieFromTmdb = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTION
    );
    const json = await data.json();

    // ✅ Filter results to keep only exact title matches (case-insensitive)
    const filteredResults = (json.results || []).filter(
      (m) => m.title.toLowerCase() === movie.trim().toLowerCase()
    );

    return filteredResults;
  };

  const handleGptSearch = async () => {
    try {
      // Initialize Gemini client
      dispatch(startLoading());
      const ai = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Build prompt with instruction + user input
      const prompt = `You are a movie recommendation system.
      When the user provides a query (like "Indian Telugu action comedy movies"),
      you must return the top 10 recommended movies as a simple comma-separated list. 
      Do not include numbering, extra text, or explanations — only movie titles separated by commas.

      User query: ${searchText.current.value}`;

      // Generate content
      const result = await model.generateContent(prompt);
      const output = result.response.text().split(",");

      const promissArray = output.map((movie) => movieFromTmdb(movie));
      const suggestedMovies = await Promise.all(promissArray);

      dispatch(
        addGptMovies({
          movieNames: output,
          movieResults: suggestedMovies,
        })
      );

      dispatch(stopLoading());
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  return (
    <>
      <div className="flex justify-center pt-[10%] p-4">
        <form
          className="flex w-full justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            className="md:w-1/3 w-screen  outline-none text-white py-1 px-2 rounded-sm bg-transparent border border-red-600"
            placeholder={lang[changeLang].gptSearchPlaceholder}
          />
          <button
            onClick={handleGptSearch}
            className="cursor-pointer bg-transparent border border-red-600 text-white rounded-sm ml-1 py-1 px-5"
          >
            {lang[changeLang].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GptSearchBar;
