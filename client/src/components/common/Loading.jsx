import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center item-center h-screen backdrop-blur-sm bg-black/30">
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};

export default Loading;
