import React from "react";
import Header from "./Header";
import Content from "./Content";
import Action from "./Action";

const WindowChat = ({ isChat, setShowDetail, showDetail }) => {
    return (
        <div
            className={`col-span-2 border-r-[1px] h-[calc(100vh-80px)] ${
                isChat ? "col-span-4 sm:col-span-2" : "sm:block hidden"
            } ${showDetail ? "sm:block hidden" : ""}`}
        >
            <Header isChat={isChat} setShowDetail={setShowDetail} />
            <Content />
            <Action />
        </div>
    );
};

export default WindowChat;
