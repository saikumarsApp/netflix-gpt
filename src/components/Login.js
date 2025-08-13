import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, seErrorMessage] = useState("");

  const email = useRef(null);
  const password = useRef(null);

  const handleValidation = () => {
    const msg = checkValidateData(email.current.value, password.current.value);
    seErrorMessage(msg);
    if (msg) return;
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          seErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a927b1ee-784d-494a-aa80-cf7a062d2523/web/IN-en-20250714-TRIFECTA-perspective_5acb7337-c372-45ec-ae12-ddb110e6ad78_large.jpg"
          alt="body"
        />
      </div>
      <form
        onClick={(e) => e.preventDefault()}
        className="absolute rounded-lg w-[30%] my-36 mx-auto right-0 left-0 p-12 bg-black text-white bg-opacity-90"
      >
        <h1 className="font-bold text-2xl my-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-[90%] rounded-sm bg-gray-700 outline-none bg-opacity-50"
          />
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email or Mobile Number"
          className="p-4 my-2 w-[90%] rounded-sm bg-gray-700 outline-none bg-opacity-50"
        />
        <input
          type="password"
          ref={password}
          placeholder="password"
          className="p-4 my-2 w-[90%] rounded-sm bg-gray-700 outline-none bg-opacity-50"
        />
        <p className="text-red-500 font-bold text-sm my-2">{errorMessage}</p>
        <button
          onClick={handleValidation}
          className="bg-red-600 my-2 font-bold py-2 px-5 w-[90%] rounded-sm text-lg"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-center my-2 text-gray-500 font-semibold my-2">OR</p>
        <button className="bg-gray-500 bg-opacity-50  rounded-sm font-bold py-2 px-5 w-[90%] ">
          Use a sign-in code
        </button>
        <p className="cursor-pointer text-center my-2 underline">
          Forgot password?
        </p>

        <div className="flex items-center">
          <input type="checkbox" className="w-5 h-5 mr-3 my-3" />
          <label className="text-sm">Remember Me</label>
        </div>
        <p className="text-sm text-gray-200">
          {isSignIn ? "New to Netflix?" : "Alredy registred!"}
          <span
            onClick={toggleSignInForm}
            className="hover:underline cursor-pointer font-bold"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
