import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef } from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";

function ChatContainer() {
  const [{ messages, userInfo, chatUser }] = useStateProvider();
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar "
    >
      {!messages.length && (
        <h1 className="p-2 text-center mt-2 text-white bg-black  rounded-2xl text-md w-1/2 m-auto">
          Messages and calls are end to end encrypted. No one outside of this
          chat not even us, can read or listen to them.
        </h1>
      )}
      <div className="bg-fixed w-full h-full opacity-5 fixed left-0 top-0 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 left-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.map((message, indx) => (
              <div
                className={`flex ${
                  message.senderId === chatUser.id
                    ? "justify-start "
                    : "justify-end"
                }`}
                key={message.id}
              >
                {message.type === "text" && (
                  <div
                    className={`text-white text-sm px-3 py-[5px] rounded-md flex gap-2 items-end max-w-[45%] ${
                      message.id === chatUser.id ? "bg-base-100" : "bg-base-300"
                    }`}
                  >
                    <span className="break-all">{message.message}</span>
                    <div className="flex gap-1 items-end ">
                      <span className="text-[11px] pt-1 min-w-fit">
                        {calculateTime(message?.createdAt)}
                      </span>
                      <span>
                        {message?.senderId === userInfo.id && (
                          <MessageStatus
                            messageStatus={message?.messageStatus}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                )}
                {message.type === "image" && <ImageMessage message={message} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
