import React from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function ChatHeader() {
  const [{ chatUser, messageSearch }, dispatch] = useStateProvider();

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center z-50">
      <div className="flex items-center justify-center gap-6 ">
        <Avatar type="sm" image={chatUser?.profilePic} />
        <div className="flex flex-col">
          <span className="">{chatUser?.name}</span>
          <span className="text-sm">online</span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className=" text-xl cursor-pointer text-primary" />
        <IoVideocam className={` cursor-pointer text-xl text-primary `} />
        <BiSearchAlt2
          onClick={() => {
            console.log("here");
            dispatch({
              type: reducerCases.SET_MESSAGE_SEARCH,
            });
          }}
          className={`text-primary cursor-pointer text-xl mb-1  ${
            messageSearch && "border-b-2 border-b-red-500 transition-all "
          }  `}
        />
        <BsThreeDotsVertical className="text-primary cursor-pointer text-xl " />
      </div>
    </div>
  );
}

export default ChatHeader;
