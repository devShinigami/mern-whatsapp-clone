import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();

  const handleContacts = () => {
    dispatch({
      type: reducerCases.SET_CONTACTS_PAGE,
    });
  };
  const changeThemes = () => {
    dispatch({
      type: reducerCases.SET_THEME_PAGE,
    });
  };
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center ">
      <div className="">
        <Avatar type="sm" image={userInfo?.dp} />
      </div>
      <div className="flex">
        <BsFillChatLeftTextFill
          title="new Chat"
          className="cursor-pointer text-xl text-primary"
          onClick={handleContacts}
        />
        <>
          <BsThreeDotsVertical
            onClick={changeThemes}
            className="mx-2 cursor-pointer text-xl text-primary"
          />
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
