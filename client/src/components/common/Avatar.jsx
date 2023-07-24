import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsCamera } from "react-icons/bs";
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({ type, image, setImage }) {
  const [hover, setHover] = useState(false);
  const [context, setcontext] = useState(false);
  const [ContextCoardinates, setContextCoardinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [camera, SetCamera] = useState(false);
  const showContext = (e) => {
    e.preventDefault();
    setContextCoardinates({ x: e.pageX, y: e.pageY });
    setcontext(true);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  const menuOptions = [
    {
      name: "Take a photo",
      callback: () => {
        SetCamera(true);
      },
    },
    {
      name: "Choose from library",
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: "Upload Photo",
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/person-default.png");
      },
    },
  ];

  const photoChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      console.log(data.src);
      setImage(data.src);
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center ">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            onMouseEnter={(e) => {
              setHover(true);
            }}
            onMouseLeave={(e) => {
              setHover(false);
            }}
            className="relative z-0"
          >
            <div
              id="context-opener"
              onClick={(e) => {
                showContext(e);
              }}
              className={`rounded-full z-10 bg-base-300/40 h-24 w-24 lg:h-60 lg:w-60 absolute  ${
                hover ? "flex visible items-center justify-center" : "hidden"
              }`}
            >
              <BsCamera
                className="text-2xl"
                onClick={(e) => {
                  showContext(e);
                }}
              />
            </div>
            <div className="h-24 w-24 lg:h-60 lg:w-60 ">
              <Image
                src={image}
                alt="avatar"
                className="rounded-full object-cover"
                fill
              />
            </div>
          </div>
        )}
      </div>
      {context && (
        <ContextMenu
          options={menuOptions}
          coardinates={ContextCoardinates}
          contextMenu={context}
          setContextMenu={setcontext}
        />
      )}

      {grabPhoto && <PhotoPicker onChange={photoChange} />}
      {showPhotoLibrary && (
        <PhotoLibrary
          setImage={setImage}
          hidePhotoLibrary={setShowPhotoLibrary}
        />
      )}
      {camera && <CapturePhoto setImage={setImage} hide={SetCamera} />}
    </>
  );
}

export default Avatar;
