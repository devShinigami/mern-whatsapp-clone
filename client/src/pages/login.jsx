import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { FirebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import animationData from "../assets/signIn.json";
import Loading from "@/components/common/Loading";
function login() {
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(false);

  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  useEffect(() => {
    const checker = () => {
      // setLoading(true);
      if (!newUser && userInfo?.id) {
        // setLoading(false);
        router.push("/login");
      }
    };
    checker();
  }, [userInfo, newUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: dp },
    } = await signInWithPopup(FirebaseAuth, provider);
    try {
      setLoading(true);
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        console.log(data);

        if (!data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: true,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              dp,
              status: "",
            },
          });
          setInfo(true);
          setErrMsg("Create your profile first!");
          setTimeout(() => {
            setLoading(false);
            setInfo(false);
          }, 4000);
          router.push("/onboarding");
        } else {
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name: data?.data.name,
              dp: data?.data.profilePic,
              about: data?.data.about,
              status: data?.data.status,
              email: data?.data.email,
              id: data?.data.id,
            },
          });
          setSuccess(true);
          setTimeout(() => {
            setLoading(false);
            setSuccess(false);
            router.push("/");
          }, 4000);
        }
      }
    } catch (e) {
      setLoading(false);
      setErrMsg("Error! Task failed successfully. ");
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
      console.log(e);
    }
  };
  return (
    <>
      <div className="relative flex justify-center items-center min-h-screen flex-col gap-6 w-screen bg-base-200">
        <div className="hero ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Chat and Call with your friends! Simple, Reliable and Secure.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <Lottie animationData={animationData} />
                <div className="form-control mt-6">
                  <button
                    onClick={handleLogin}
                    className="btn btn-primary bg-cyan-700 border-none outline-none hover:bg-cyan-950"
                  >
                    <FcGoogle />
                    Login with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {err && (
          <div className="alert alert-error absolute bottom-4 mx-auto w-1/2 z-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errMsg}</span>
          </div>
        )}
        {info && (
          <div className="alert alert-info absolute bottom-4 mx-auto w-1/2 z-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errMsg}</span>
          </div>
        )}
        {success && (
          <div className="alert alert-success absolute bottom-4 mx-auto w-1/2 z-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Login Successfully!</span>
          </div>
        )}
      </div>
      {loading && (
        <div className="absolute inset-0 ">
          <Loading />
        </div>
      )}
    </>
  );
}

export default login;
