import React, { useContext } from "react";
import { BiPlus } from "react-icons/bi";
import Search from "../Search/Search";
import FriendsList from "../FriendsList/FriendsList";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function SidebarChats({ isChat }) {
    const { t } = useContext(MultiLanguageContext);

    return (
        <div
            className={`flex flex-col grid-cols-1 sm:col-span-1 col-span-4 border-r-[1px] h-[calc(100vh-80px)] pb-[20px] w-full ${
                isChat ? "sm:block hidden" : ""
            }`}
        >
            <div className="flex justify-between items-center p-3 text-[1.5rem] ">
                <h2 className="font-semibold">{t("chats.title")}</h2>
                <div className="p-1 bg-slate-400 dark:bg-slate-300 text-primary5 cursor-pointer  dark:text-primary2 rounded-[4px]">
                    <BiPlus />
                </div>
            </div>
            <Search />
            <FriendsList />
        </div>
    );
}

export default SidebarChats;
