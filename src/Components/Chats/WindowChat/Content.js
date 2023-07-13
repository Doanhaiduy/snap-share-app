import React, { useContext, useEffect, useRef } from "react";
import Message from "./Message";
import { ChatsContext } from "~/Context/ChatsContext";
import { AuthContext } from "~/Context/AuthContextProvider";

const Content = () => {
    const { windowChat } = useContext(ChatsContext);
    const messagesEndRef = useRef(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        scrollToBottom();
    }, [windowChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="border-b-[1px] h-[calc(100%-133px)] flex flex-col gap-4 p-2 overflow-y-scroll no-scrollbar ">
            {windowChat?.message?.map((item, index) => (
                <Message mess={item} key={index} owner={!(item.receiverID === currentUser?.uid)} />
            ))}

            <div ref={messagesEndRef} />
        </div>
    );
};

export default Content;
