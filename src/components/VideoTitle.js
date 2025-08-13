import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, disc }) => {
  return (
    <>
      <div className="w-screen aspect-video py-[20%] px-20 absolute text-white bg-gradient-to-r from-black  ">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-sm w-1/3 py-4">{disc}</p>
        <div>
          <button className="bg-white text-black py-2 px-10 rounded-lg font-bold cursor-pointer hover:opacity-80">
            <span className="flex items-center">
              <FaPlay className="mr-2" /> {/* mr-2 adds right margin */}
              Play
            </span>
          </button>
          <button className="bg-gray-500 text-white py-2 ml-4 px-10 rounded-lg font-bold cursor-pointer hover:opacity-60">
            <span className="flex items-center">
              <IoMdInformationCircleOutline className="mr-2 text-lg" />{" "}
              {/* mr-2 adds right margin */}
              More info
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
export default VideoTitle;
