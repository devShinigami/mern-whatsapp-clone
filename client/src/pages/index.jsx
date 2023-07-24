import Main from "@/components/Main";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function index() {
  const [{ userInfo, newUser }] = useStateProvider();
  // const router = useRouter();
  // useEffect(() => {
  //   const checker = () => {
  //     if (!userInfo?.id && !userInfo?.email) {
  //       router.push("/login");
  //     }
  //   };
  //   checker();
  // }, []);

  return (
    <>
      <Main />
    </>
  );
}

export default index;
