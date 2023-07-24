import Image from "next/image";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/robot.json";

function Empty() {
  return (
    <div className="border-conversation-border border-1 w-full bg-base-200 flex flex-col h-[100vh] items-center justify-center">
      <div className="w-64 h-64">
        <Lottie animationData={animationData} />
      </div>
    </div>
  );
}

export default Empty;
