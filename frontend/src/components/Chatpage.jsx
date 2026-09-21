import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {baseURL} from "../config/Axioshelper"
import toast from "react-hot-toast";
import { timeAgo } from "../config/helper";
import { getMessagess } from "../services/RoomService";
const ChatPage = () => {
  const {
    roomid,
    curruser,
    connected,
    setconnected,
    setroomid,
    setcurruser
} = useChatContext();
   const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomid, curruser]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  
useEffect(() => {
  async function loadMessages() {
    try {
      const messages = await getMessagess(roomid);
      setMessages(messages);
    } catch (error) {
      console.log(error);
    }
  }

  if (connected && roomid) {
    loadMessages();
  }
}, [connected, roomid]);

  //scroll down

useEffect(() => {
  if (!connected || !roomid) {
    return;
  }

  const sock = new SockJS(`${baseURL}/chat`);
  const client = Stomp.over(sock);

  client.connect({}, () => {
    setStompClient(client);

    const subscription = client.subscribe(
      `/topic/room/${roomid}`,
      (message) => {
        console.log("MESSAGE RECEIVED:", message.body);

        const newMessage = JSON.parse(message.body);

        setMessages((prev) => [...prev, newMessage]);
      }
    );

    client._subscription = subscription;
  });

  return () => {
    if (client.connected) {
      client.unsubscribe();
      client.disconnect();
    }
  };
}, [connected, roomid]);
  
   const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);

      const message = {
        sender: curruser,
        content: input,
        roomId: roomid,
      };

      stompClient.send(
        `/app/sendMessage/${roomid}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }

    //
  };

  function handleLogout() {
    stompClient.disconnect();
    setconnected(false);
    setroomid("");
    setcurruser("");
    navigate("/");
  }

  const fileInputRef = useRef(null);

function handleFileChange(event) {
  const file = event.target.files[0];

  if (file) {
    console.log("Selected file:", file);
  }
}

  return (
  <div className="min-h-screen bg-slate-950 text-white">

    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">

        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <span className="text-lg font-bold">C</span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Room
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              {roomid}
            </h1>
          </div>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 ring-1 ring-white/10">
            <span className="text-sm font-semibold">
              {curruser?.charAt(0).toUpperCase()}
            </span>
          </div>

          <div>
            <p className="text-xs text-slate-500">Signed in as</p>
            <p className="text-sm font-medium text-slate-200">
              {curruser}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl border cursor-pointer border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300"
        >
          Leave
        </button>

      </div>
    </header>

    <main
      ref={chatBoxRef}
      className="mx-auto h-screen w-full max-w-5xl overflow-auto px-4 pb-32 pt-28 sm:px-6 no-scrollbar"
    >
      <div className="flex flex-col">

        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`flex ${
                message.sender === curruser
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`group my-2 max-w-sm rounded-2xl border px-4 py-3 shadow-lg transition-all duration-200 sm:max-w-md ${
                  message.sender === curruser
                    ? "rounded-br-md border-violet-400/20 bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-900/20"
                    : "rounded-bl-md border-white/10 bg-slate-800/80 shadow-black/20 backdrop-blur-sm"
                }`}
              >
                <div className="flex gap-3">

                  <img
                    className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white/10"
                    src="https://play-lh.googleusercontent.com/Qs3b8aBtBBeETBq13i8RRWuMs32JqFzO7-05yAbeNTezt-F_uWSazVNk2doOvsAiMe1NhbaraQlU3cHrRqsckA"
                    alt=""
                  />

                  <div className="min-w-0 flex flex-col gap-1">
                    <p className="text-xs font-semibold text-white/70">
                      {message.sender}
                    </p>

                    <p className="break-words text-sm leading-6 text-white">
                      {message.content}
                    </p>

                    <p className="text-[11px] text-white/40">
                      {timeAgo(message.timestamp)}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

      </div>
    </main>

    <div className="fixed bottom-0 left-0 z-40 w-full bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 pb-5 pt-10">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">

        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          type="text"
          placeholder="Type a message..."
          className="h-full flex-1 bg-transparent px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />

        <>
  <input
    ref={fileInputRef}
    type="file"
    className="hidden"
    onChange={handleFileChange}
  />

  <button
    type="button"
    onClick={() => fileInputRef.current.click()}
    className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-slate-800 text-slate-400 transition-all duration-200 hover:bg-slate-700 hover:text-white"
  >
    <MdAttachFile size={20} />
  </button>
</>

        <button
          onClick={sendMessage}
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:scale-105 hover:from-violet-500 hover:to-indigo-500 active:scale-95"
        >
          <MdSend size={20} />
        </button>

      </div>
    </div>

  </div>
);
};

export default ChatPage;