import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LOGO, SUPPORTED_LANGAUGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showGptSearch = useSelector((Store) => Store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    console.log("clicked");
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  const handleToggle = () => {
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displaName } = user;
        dispatch(addUser({ uid: uid, email: email, displaName: displaName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  const handleLangaugeConfig = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <>
      <div className="fixed w-screen  py-2 px-2 bg-gradient-to-b from-black z-[9999] flex flex-col md:flex-row md:justify-between">
        <div className="w-screen flex justify-center md:flex md:justify-start ">
          <img src={LOGO} alt="logo" className="w-44 opacity-100" />
        </div>
        <div className="mt-1 md:mt-3 flex justify-center md:flex md:flex-row">
          {showGptSearch && (
            <select
              onChange={handleLangaugeConfig}
              className="bg-gray-900 border border-blue-700 text-blue-700 focus:outline-none focus:ring-1
           focus:ring-blue-700 focus:border-blue-700 mr-3 px-4 py-1 rounded-lg whitespace-nowrap md:h-9"
            >
              {SUPPORTED_LANGAUGES.map((lang) => (
                <option
                  key={lang.identifier}
                  className="bg-transparent"
                  value={lang.identifier}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          {user && (
            <>
              <button
                onClick={handleToggle}
                className="bg-transparent whitespace-nowrap md:h-9 border  border-green-500 text-green-500 mr-3 font-bold py-1 px-4 rounded-lg  hover:opacity-80 cursor-pointer"
              >
                {showGptSearch ? "Home" : "GPT Search"}
              </button>
              <button
                onClick={handleSignOut}
                className="bg-tranperant md:h-9 whitespace-nowrap border border-red-700 text-red-600 py-1 px-4 mr-4 rounded-lg font-bold hover:opacity-80 cursor-pointer"
              >
                SIGN OUT
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
