import GptSearchBar from "./GptSearchBar";
import GptSearchSuggestions from "./GptSearchSuggestions";

const GptSearch = () => {
  return (
    <>
      <div className="bg-black h-screen pt-[22%] md:pt-0">
        <GptSearchBar />
        <GptSearchSuggestions />
      </div>
    </>
  );
};
export default GptSearch;
