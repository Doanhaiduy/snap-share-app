import React, { useContext } from "react";
import FriendActiveItem from "./FriendActiveItem";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import useUser from "~/hooks/useUser";
import { AuthContext } from "~/Context/AuthContextProvider";

function FriendActive({ isMobile }) {
    const { currentUser } = useContext(AuthContext);
    const { t } = useContext(MultiLanguageContext);
    const { user } = useUser(currentUser?.uid);

    return (
        <div className={`${!isMobile && "lg:block hidden"}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold uppercase text-gray-500 ">{t("suggestion.friendActive.title")}</h3>
                <span className="flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-full text-white">
                    <span className="text-sm">{user?.friend?.length || "0"}</span>
                </span>
            </div>
            <div className=" bg-white dark:bg-[#282828] dark:text-primary5 h-auto p-5 flex flex-col gap-4 rounded-[12px]">
                {user?.friend?.map((id) => (
                    <FriendActiveItem key={id} uid={id} />
                ))}
            </div>
        </div>
    );
}

export default FriendActive;
