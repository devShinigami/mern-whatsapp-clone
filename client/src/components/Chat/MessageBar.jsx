import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { useStateProvider } from "@/context/StateContext";
import axios from "axios";
import { SENT_IMAGES, SENT_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";
import EmojiPicker from "emoji-picker-react";
import PhotoPicker from "../common/PhotoPicker";
import dynamic from "next/dynamic";
const CaptureAudio = dynamic(() => import("../common/CaptureAudio"), {
  ssr: false,
});
function MessageBar() {
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showRecording, setShowRecording] = useState(false);

  const emojiRef = useRef(null);

  const handleEmoji = () => {
    setEmoji(!emoji);
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => (prev += emoji.emoji));
  };

  const [{ userInfo, chatUser, socket }, dispatch] = useStateProvider();

  const sendMessage = async () => {
    try {
      const { data } = await axios.post(`${SENT_MESSAGE_ROUTE}`, {
        to: chatUser?.id,
        from: userInfo?.id,
        message,
      });
      socket.current.emit("send-msg", {
        to: chatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: { ...data.message },
        fromSelf: true,
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleOutsideCLick = (event) => {
      if (event.target.id !== "emoji-open") {
        if (emojiRef.current && !emojiRef.current.contains(event.target)) {
          setEmoji(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideCLick);
    return () => {
      document.removeEventListener("click", handleOutsideCLick);
    };
  }, []);

  const photoChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(SENT_IMAGES, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          from: userInfo?.id,
          to: chatUser?.id,
        },
      });
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          to: chatUser?.id,
          from: userInfo?.id,
          message: response.data.message,
        });
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: { ...response.data.message },
          fromSelf: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  return (
    <div className="h-20 px-4 flex items-center gap-6 relative">
      {!showRecording && (
        <>
          <div className="flex gap-6">
            <BsEmojiSmile
              className="cursor-pointer text-xl"
              title="emoji"
              id="emoji-open"
              onClick={handleEmoji}
            />
            {emoji && (
              <div ref={emojiRef} className="absolute bottom-24 left-16 z-60 ">
                <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
              </div>
            )}
            <ImAttachment
              className="cursor-pointer text-xl"
              title="Attach file"
              onClick={() => {
                setGrabPhoto(true);
              }}
            />
          </div>
          <div className="w-full h-10 rounded-lg flex items-center ">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message"
              className="bg-black text-sm focus:outline-none  rounded-lg px-5 py-4 w-full"
            />
          </div>
          <div className="flex w-10 items-center justify-center">
            <button onClick={sendMessage}>
              {message.length ? (
                <MdSend title="send Message" />
              ) : (
                <FaMicrophone
                  className="text-xl cursor-pointer "
                  title="Record Message"
                  // onClick={() => setShowRecording(true)}
                />
              )}
            </button>
          </div>
        </>
      )}

      {grabPhoto && <PhotoPicker onChange={photoChange} />}
      {/* {showRecording && <CaptureAudio hide={setShowRecording} />} */}
    </div>
  );
}

export default MessageBar;
