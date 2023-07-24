import React, { useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";

function CapturePhoto({ hide, setImage }) {
  const ref = useRef(null);

  useEffect(() => {
    let stream;
    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      ref.current.srcObject = stream;
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const takePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.getContext("2d").drawImage(ref.current, 0, 0, 300, 150);
    setImage(canvas.toDataURL("image/jpeg"));
    hide(false);
  };

  return (
    <div className="absolute w-full bg-base-200 rounded-xl pt-2 items-center justify-center">
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div className="pt-2 pr-2 cursor-pointer flex  items-end justify-end">
          <IoIosClose
            className="h-10 w-10 cursor-pointer "
            onClick={() => {
              hide(false);
            }}
          />
        </div>
        <div className="flex justify-center">
          <video id="video" width="400" autoPlay ref={ref} src=""></video>
        </div>
        <button
          onClick={takePhoto}
          className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light mb-19"
        ></button>
        <h1>Take Picture</h1>
      </div>
    </div>
  );
}

export default CapturePhoto;
