import { IMG_CDN_PATH } from "../utils/constants";

const MovieCard = ({ imgPath }) => {
  return (
    <>
      <div className="pr-2 w-60 h-32 overflow-hidden">
        <img
          alt="img"
          className="w-full h-full object-cover"
          src={IMG_CDN_PATH + imgPath}
        />
      </div>
    </>
  );
};

export default MovieCard;
