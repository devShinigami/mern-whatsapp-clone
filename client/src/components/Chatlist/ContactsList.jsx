import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_USERS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import Loading from "../common/Loading";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [{ contactsPage }, dispatch] = useStateProvider();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        setLoading(true);
        const {
          data: { users },
        } = await axios.get(`${GET_USERS_ROUTE}`);
        setContacts(users);
        setLoading(false);
        console.log(contacts);
      } catch (e) {
        console.log(e);
      }
    };

    getContacts();
  }, []);

  return (
    <div className="h-full flex flex-col ">
      <div className="h-24 flex items-end px-3 py-4 ">
        <div className="flex items-center gap-12 ">
          <BiArrowBack
            className="cursor-pointer text-xl text-primary"
            onClick={() =>
              dispatch({
                type: reducerCases.SET_CONTACTS_PAGE,
              })
            }
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14 ">
          <div className="flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="cursor-pointer text-lg text-primary" />
            </div>
            <div>
              <input
                type="text "
                placeholder="Search Contacts"
                className="bg-transparent text-sm focus:outline-none  w-full"
              />
            </div>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {Object.entries(contacts).map(([initialLetter, userList]) => (
              <div key={Date.now() + initialLetter}>
                <div className=" pl-10 py-5 ">{initialLetter}</div>
                {userList.map((contact) => (
                  <ChatLIstItem
                    data={contact}
                    isContactsPage={true}
                    key={contact.id}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ContactsList;
