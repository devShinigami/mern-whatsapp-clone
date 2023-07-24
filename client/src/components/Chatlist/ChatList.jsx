import React, { useEffect, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";
import ThemeSettings from "./ThemeSettings";

function ChatList() {
  const [{ contactsPage, themePage }] = useStateProvider();
  const [page, setPage] = useState("default");

  useEffect(() => {
    if (contactsPage) {
      setPage("all-contacts");
    } else {
      setPage("default");
    }
  }, [contactsPage]);
  useEffect(() => {
    if (themePage) {
      setPage("all-themes");
    } else {
      setPage("default");
    }
  }, [themePage]);

  return (
    <div className="flex flex-col max-h-screen z-20">
      {page === "default" && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {page === "all-contacts" && <ContactsList />}
      {page === "all-themes" && <ThemeSettings />}
      {/* {page === "default" && <ChatList />} */}
    </div>
  );
}

export default ChatList;
