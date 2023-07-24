import { reducerCases } from "@/context/constants";
import { GET_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatLIstItem from "./ChatLIstItem";
import { useStateProvider } from "@/context/StateContext";

function List() {
  const [{ userInfo, userContacts }, dispatch] = useStateProvider();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios.get(`${GET_CONTACTS}/${userInfo.id}`);
        dispatch({
          type: reducerCases.SET_USER_CONTACTS,
          userContacts: users,
        });
        dispatch({
          type: reducerCases.SET_ONLINE_USERS,
          onlineUsers,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo?.id) {
      getContacts();
      console.log(userContacts);
    }
  }, [userInfo]);

  return (
    <div className="flex-auto overflow-auto max-h-full custom-scrollbar">
      {userContacts?.map((contact) => (
        <ChatLIstItem data={contact} key={contact.id + Date.now()} />
      ))}
    </div>
  );
}

export default List;
