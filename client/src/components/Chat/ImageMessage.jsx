import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import React from "react";
import MessageStatus from "../common/MessageStatus";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";

function ImageMessage({ message }) {
  const [{ userInfo, chatUser }] = useStateProvider();

  return (
    <div
      className={`p-1 rounded-lg ${
        message.senderId === chatUser.id ? "bg-black" : "bg-black"
      }`}
    >
      <div className="relative">
        <Image
          className="rounded-lg"
          alt="asset"
          src={`${HOST}/${message.message}`}
          height={300}
          width={300}
        />
        <div className="absolute bottom-1 right-1 flex items-end gap-1 bg-black p-2 rounded-xl ">
          <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
            {calculateTime(message?.createdAt)}
          </span>
          <span className="text-bubble-meta">
            {message.senderId === userInfo.id && (
              <MessageStatus messageStatus={message?.messageStatus} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ImageMessage;
