import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const VideoTitle = ({ title, disc }) => {
  return (
    <>
      <div className="w-screen aspect-video py-[20%] px-2 md:px-20 absolute text-white bg-gradient-to-r from-black  ">
        <h1 className="md:text-4xl text-xl font-bold">{title}</h1>
        <p className="hidden md:block text-sm w-1/3 py-4">{disc}</p>
        <div className="flex">
          <button className="bg-white text-black px-4 py-1 mt-2 md:mt-0 md:py-2 md:px-10 rounded-lg font-bold cursor-pointer hover:opacity-80">
            <span className="flex items-center">
              <FaPlay className="mr-2" /> {/* mr-2 adds right margin */}
              Play
            </span>
          </button>
          <button className="bg-gray-500 hidden md:block text-white py-2 ml-4 px-10 rounded-lg font-bold cursor-pointer hover:opacity-60">
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
