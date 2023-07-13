import React, { useContext, useEffect, useState } from "react";
import SidebarChats from "~/Components/Chats/SidebarChats/SidebarChats";
import WindowChat from "~/Components/Chats/WindowChat/WindowChat";
import ChatDetails from "~/Components/Chats/ChatDetails/ChatDetails";
import { ChatsContext } from "~/Context/ChatsContext";

const Chats = ({ title }) => {
    const { windowChat } = useContext(ChatsContext);
    const [isChat, setIsChat] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    useEffect(() => {
        if (!windowChat?.id) {
            setIsChat(false);
        } else {
            setIsChat(true);
        }
    }, [windowChat]);
    useEffect(() => {
        document.title = title + " | SnapShare";
    }, [title]);
    return (
        <div className="mb-[10px] mx-auto h-[calc(100vh-80px)] mt-[80px] text-primary2 grid grid-cols-4 col-span-5 w-full lg:col-span-4  bg-[#fff] dark:bg-[#282828] dark:text-primary5  rounded-[10px]">
            <SidebarChats isChat={isChat} />
            <WindowChat isChat={isChat} setShowDetail={setShowDetail} showDetail={showDetail} />
            <ChatDetails isChat={isChat} setShowDetail={setShowDetail} showDetail={showDetail} />
        </div>
    );
};

export default Chats;
