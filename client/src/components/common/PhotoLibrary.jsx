import Image from "next/image";
import React from "react";
import { IoIosClose } from "react-icons/io";
function PhotoLibrary({ setImage, hidePhotoLibrary }) {
  const images = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];

  return (
    <div className="fixed top-0 left-0 max-h-[100vh] max-w-[100vw] flex h-full w-full items-center justify-center">
      <div className="h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
        <div className="pt-2 pr-2 cursor-pointer flex  items-end justify-end">
          <IoIosClose
            className="h-10 w-10 cursor-pointer "
            onClick={() => {
              hidePhotoLibrary(false);
            }}
          />
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-12 p-10 w-full h-full">
          {images.map((image, indx) => (
            <div
              onClick={() => {
                setImage(images[indx]);
                hidePhotoLibrary(false);
              }}
            >
              <div className="cursor-pointer relative">
                <Image
                  src={image}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PhotoLibrary;
