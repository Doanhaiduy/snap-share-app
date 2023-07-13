import moment from "moment";
import React, { useContext } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AuthContext } from "~/Context/AuthContextProvider";
import { ChatsContext } from "~/Context/ChatsContext";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import useUser from "~/hooks/useUser";

const FriendItem = ({ data }) => {
    const { windowChat, getWindowChat } = useContext(ChatsContext);
    const { t } = useContext(MultiLanguageContext);
    const { user } = useUser(data?.id);
    const { currentUser } = useContext(AuthContext);
    const isCurrent = data.id === windowChat.receiverID || data.id === windowChat.senderID;

    return (
        <div
            className={`flex items-center gap-2 hover:bg-slate-200  dark:hover:bg-[#555]   cursor-pointer p-2 rounded-[10px] ${
                isCurrent && "bg-slate-200 dark:bg-[#555]"
            }`}
            onClick={() => {
                getWindowChat(
                    currentUser?.uid < user?.uid ? currentUser?.uid + user.uid : user?.uid + currentUser?.uid
                );
            }}
        >
            <div className="">
                <img className="w-[40px] h-[40px] rounded-full object-cover" src={user?.photoURL} alt="" />
            </div>
            <div className="flex-1 flex flex-col">
                <h3 className="font-semibold line-clamp-1">
                    {user?.name}
                    {user?.verified && (
                        <BsFillCheckCircleFill className="text-[12px] inline text-[#5890ff] dark:text-primary1 mb-[5px] ml-[6px]" />
                    )}
                </h3>
                <div className="line-clamp-1 flex gap-1 text-[12px]">
                    <span className="line-clamp-1 flex-1 ">
                        {data?.lastMessage === "Sent an image" ? t("chats.windowChat.sentImage") : data?.lastMessage}{" "}
                    </span>
                    <span className="line-clamp-1 text-blue-600 dark:text-primary1 font-medium">
                        {moment().diff(data?.timestamp, "days") > 30
                            ? data?.timestamp
                            : moment(data?.timestamp).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FriendItem;
