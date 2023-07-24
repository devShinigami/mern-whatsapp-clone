import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FcNext } from "react-icons/fc";
import animationData from "../assets/robot.json";
import Lottie from "lottie-react";

function onboarding() {
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  const [about, setAbout] = useState("");
  const [dp, setDp] = useState("/person-default.png");
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);

  const router = useRouter();

  const onBoard = async () => {
    if (validate()) {
      const email = userInfo?.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          about,
          image: dp,
          name,
        });
        console.log(data);
        if (data?.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER,
            newUser: false,
          });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data?.id,
              name,
              email,
              dp,
              status: about,
            },
          });
          router.push("/");
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setErr(true);
    }
  };

  const validate = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    const checker = () => {
      if (!newUser && !userInfo?.email) {
        router.push("/login");
      } else if (!newUser && userInfo?.email) {
        router.push("/");
      }
    };
    checker();
  }, [newUser, userInfo, router]);
  return (
    <>
      <div className="relative flex justify-center items-center min-h-screen flex-col gap-6 w-screen bg-base-200 overflow-x-hidden">
        <div className="hero w-full">
          <div className="hero-content w-full flex-col lg:flex-row-reverse">
            <div className="flex justify-between items-center w-full">
              <div className="text-center lg:text-left flex flex-col items-center mx-auto">
                <div className="w-64 h-64">
                  <Lottie animationData={animationData} />
                </div>
                <h1 className="lg:text-5xl font-bold">Create Your Profile!</h1>
              </div>
              <button
                onClick={onBoard}
                className="px-4 py-2 items-center hidden lg:flex"
              >
                Next
                <FcNext className="text-5xl" />
              </button>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <Avatar type="xl" image={dp} setImage={setDp} />

                <Input
                  placeholder={userInfo?.name}
                  name="Display Name"
                  state={name}
                  setState={setName}
                  label
                />
                <Input name="About" state={about} setState={setAbout} label />
                <button
                  onClick={onBoard}
                  className="px-4 py-2 items-center flex lg:hidden"
                >
                  Next
                  <FcNext className="text-5xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default onboarding;
