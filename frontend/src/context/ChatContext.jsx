import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [roomid, setroomid] = useState('');
    const [curruser, setcurruser] = useState('');
    const [connected, setconnected] = useState(false)

    return (
        <ChatContext.Provider
            value={{ roomid, curruser, setroomid, setcurruser,connected, setconnected }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => useContext(ChatContext);

export default useChatContext;