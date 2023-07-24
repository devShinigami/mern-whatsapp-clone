import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { FaCamera } from "react-icons/fa";

function ChatLIstItem({ data, isContactsPage = false }) {
  const [{ userInfo, chatUser }, dispatch] = useStateProvider();
  const handleContact = () => {
    // if (chatUser?.id === data?.id) {
    if (!isContactsPage) {
      dispatch({
        type: reducerCases.CHANGE_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePic: data.profilePic,
          email: data.email,
          id: userInfo.id === data.senderId ? data.receiverId : data.senderId,
        },
      });
    } else {
      dispatch({
        type: reducerCases.CHANGE_CHAT_USER,
        user: { ...data },
      });
      dispatch({
        type: reducerCases.SET_CONTACTS_PAGE,
      });
    }
    // }
  };
  return (
    <div
      onClick={handleContact}
      className={` flex cursor-pointer items-center hover:bg-primary`}
    >
      <div className="min-w-fit px-5 pt-3 pb-1 ">
        <Avatar type="sm" image={data?.profilePic} />
      </div>
      <div className="flex min-h-full flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between ">
          <div>
            <span className="">{data?.name}</span>
          </div>
          {!isContactsPage && (
            <div>
              <span
                className={`${
                  !data.totalUnreadMessages > 0
                    ? "text-secondary"
                    : "text-white"
                } text-sm `}
              >
                {calculateTime(data.createdAt)}
              </span>
            </div>
          )}
        </div>
        <div className="flex border-b pb-2 pt-1 ">
          <div className="flex justify-between w-full">
            <span className="line-clamp-1 text-sm">
              {isContactsPage ? (
                data?.about
              ) : (
                <div className="flex items-center gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px] ">
                  {data.senderId === userInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === "text" && (
                    <span className="truncate">{data.message}</span>
                  )}
                  {data.type === "image" && (
                    <span className="flex gap-1 items-center ">
                      <FaCamera /> Image
                    </span>
                  )}
                </div>
              )}
            </span>
            {data.totalUnreadMessages > 0 && (
              <span className="px-[7px] rounded-full text-sm">
                {data.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
