import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGES, HOST } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import SearchMessages from "./Chat/SearchMessages";
function Main() {
  const socket = useRef();
  const [socketEvent, setSocketEvent] = useState(false);
  const [{ userInfo, chatUser, messageSearch, theme }, dispatch] =
    useStateProvider();
  const router = useRouter();
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (user) router.push("/login");
  }, [user]);
  onAuthStateChanged(FirebaseAuth, async (currentUser) => {
    if (!currentUser) setUser(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser?.email,
      });
      if (!data.status) {
        router.push("/login");
      }
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: {
          name: data.data.name,
          dp: data.data.profilePic,
          about: data.data.about,
          status: data.data.status,
          email: data.data.email,
          id: data.data.id,
        },
      });
    }
  });

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);
      dispatch({
        type: reducerCases.SET_SOCKET,
        socket,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-receive", (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });
      });
      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => {
      const {
        data: { messages },
      } = await axios.get(`${GET_MESSAGES}/${userInfo?.id}/${chatUser?.id}`);
      dispatch({
        type: reducerCases.SET_MESSAGES,
        messages,
      });
    };

    if (chatUser?.id) {
      getMessages();
    }
  }, [chatUser]);

  return (
    <>
      <div
        data-theme={theme}
        className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full"
      >
        <ChatList />
        {chatUser ? (
          <div className={messageSearch ? "grid grid-cols-2" : "grid-cols-2"}>
            <Chat />
            {messageSearch && <SearchMessages />}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}

export default Main;
