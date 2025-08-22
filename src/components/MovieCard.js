import { IMG_CDN_PATH } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ id, imgPath, title }) => {
  const navigate = useNavigate();

  if (!imgPath) return null;

  return (
    <div
      className="pr-2 w-60 h-32 overflow-hidden rounded-sm cursor-pointer"
      onClick={() => navigate(`/movie/${id}`)}
    >
      <img
        alt={title}
        className="w-full h-full object-cover"
        src={IMG_CDN_PATH + imgPath}
      />
    </div>
  );
};

export default MovieCard;
