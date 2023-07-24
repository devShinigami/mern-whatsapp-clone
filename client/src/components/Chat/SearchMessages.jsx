import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Avatar from "../common/Avatar";

function SearchMessages() {
  const [{ chatUser, messages, userInfo }, dispatch] = useStateProvider();
  const [search, setSearch] = useState("");
  const [searchedMessages, setSearchedMessages] = useState([]);
  useEffect(() => {
    if (search) {
      setSearchedMessages(
        messages.filter(
          (message) =>
            message.type === "text" && message.message.includes(search)
        )
      );
    } else {
      setSearchedMessages([]);
    }
  }, [search]);

  return (
    <div className="border-1 w-full flex flex-col z-20 max-h-screen bg-black">
      <div className="h-16 flex gap-10 items-center py-5 ">
        <IoClose
          onClick={() => {
            dispatch({
              type: reducerCases.SET_MESSAGE_SEARCH,
            });
          }}
          className="cursor-pointer text-2xl"
        />
        <span>Search Messages</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="bg-gray-700 flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
              <div>
                <BiSearchAlt2 className="cursor-pointer text-lg" />
              </div>
              <div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text "
                  placeholder="Search Messages"
                  className="bg-transparent text-sm focus:outline-none text-white w-full"
                />
              </div>
            </div>
          </div>
          <span className="mt-10">
            {!search.length && `Search for messages with ${chatUser?.name}`}
          </span>
        </div>
        <div className="flex justify-center h-full flex-col ">
          {search.length > 0 && !searchedMessages.length && (
            <span className="w-full flex justify-center">
              No messages found...
            </span>
          )}
          <div className="flex flex-col w-full h-full">
            {searchedMessages.map((message, indx) => (
              <div className="flex px-4">
                {message.senderId === chatUser.id ? (
                  <Avatar type="sm" image={chatUser.profilePic} />
                ) : (
                  <Avatar type="sm" image={userInfo?.dp} />
                )}
                <div className="flex cursor-pointer flex-col justify-center w-full px-5  py-5">
                  {message.senderId === chatUser.id ? (
                    <h1 className="text-white">{chatUser?.name}</h1>
                  ) : (
                    <h1 className="text-white">{userInfo?.name}</h1>
                  )}
                  <div className="text-sm">
                    {calculateTime(message?.createdAt)}
                  </div>
                  <div>{message?.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
