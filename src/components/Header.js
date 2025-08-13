import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("clicked");
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
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

  return (
    <>
      <div className="absolute w-screen py-2 px-2 bg-gradient-to-b from-black z-[9999] flex justify-between">
        <div>
          <img src={LOGO} alt="logo" className="w-44 opacity-100" />
        </div>
        <div className="mt-3">
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:opacity-80 cursor-pointer"
          >
            sign Out
          </button>
        </div>
      </div>
    </>
  );
};
export default Header;
