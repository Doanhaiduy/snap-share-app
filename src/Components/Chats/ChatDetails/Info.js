import React, { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { ChatsContext } from "~/Context/ChatsContext";
import useUser from "~/hooks/useUser";
import { AuthContext } from "~/Context/AuthContextProvider";
import { Link } from "react-router-dom";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

const Info = () => {
    const { windowChat } = useContext(ChatsContext);
    const { currentUser } = useContext(AuthContext);
    const { setCurrentProfile } = useContext(ProfileContext);
    const { t } = useContext(MultiLanguageContext);

    const { user } = useUser(
        windowChat?.receiverID === currentUser?.uid ? windowChat?.senderID : windowChat?.receiverID
    );
    return (
        <div className="flex flex-col items-center border-b-[1px] pb-3">
            <img src={user?.photoURL} className="w-[130px] h-[130px] rounded-full object-cover p-3" alt="" />
            <h2 className="font-bold text-center text-[20px] mt-[-6px]">
                {user?.name}
                {user?.verified && (
                    <BsFillCheckCircleFill className="text-[16px] inline text-[#5890ff] dark:text-primary1 mb-[5px] ml-[6px]" />
                )}
            </h2>
            <span className="text-green-400 text-[12px] text-center">{t("chats.online")}</span>
            <div className="flex gap-3 mt-2">
                <div className=" flex cursor-pointer items-center flex-col gap-1">
                    <Link
                        to={`/profile/${user?.nameId || user?.uid}`}
                        onClick={() => {
                            setCurrentProfile(user);
                            localStorage.setItem("currentProfile", JSON.stringify(user));
                        }}
                        className="p-2 bg-slate-200 dark:bg-[#555] hover:bg-slate-300 dark:hover:bg-[#444] mt-2 rounded-full"
                    >
                        <PersonIcon />
                    </Link>
                    <span className="text-[10px]">{t("chats.detail.profile")}</span>
                </div>
                <div className=" flex cursor-pointer items-center flex-col gap-1">
                    <div className="p-2 bg-slate-200 dark:bg-[#555] mt-2 rounded-full">
                        <NotificationsIcon />
                    </div>
                    <span className="text-[10px]">{t("chats.detail.mute")}</span>
                </div>
                <div className=" flex cursor-pointer items-center flex-col gap-1">
                    <div className="p-2 bg-slate-200 dark:bg-[#555] mt-2 rounded-full">
                        <SearchIcon />
                    </div>
                    <span className="text-[10px]">{t("chats.detail.search")}</span>
                </div>
            </div>
        </div>
    );
};

export default Info;
