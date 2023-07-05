import React, { useContext } from "react";
import FriendActiveItem from "./FriendActiveItem";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function FriendActive({ isMobile }) {
    const { t } = useContext(MultiLanguageContext);

    return (
        <div className={`${!isMobile && "lg:block hidden"}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold uppercase text-gray-500 ">{t("suggestion.friendActive.title")}</h3>
                <span className="flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-full text-white">
                    <span className="text-sm">2</span>
                </span>
            </div>
            <div className=" bg-white dark:bg-[#282828] dark:text-primary5 h-auto p-5 flex flex-col gap-4 rounded-[12px]">
                <FriendActiveItem />
                <FriendActiveItem />
                <FriendActiveItem />
                <FriendActiveItem />
                <FriendActiveItem />
                <FriendActiveItem />
            </div>
        </div>
    );
}

export default FriendActive;
