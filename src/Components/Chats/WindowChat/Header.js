import { Call, ChevronLeft, MoreHoriz, VideoCall } from "@mui/icons-material";
import React, { useContext } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AuthContext } from "~/Context/AuthContextProvider";
import { ChatsContext } from "~/Context/ChatsContext";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import useUser from "~/hooks/useUser";

const Header = ({ isChat, setShowDetail }) => {
    const { windowChat, setWindowChat } = useContext(ChatsContext);
    const { currentUser } = useContext(AuthContext);
    const { t } = useContext(MultiLanguageContext);
    const handleShowDetail = () => {
        setShowDetail(true);
    };
    const { user } = useUser(
        windowChat?.receiverID === currentUser?.uid ? windowChat?.senderID : windowChat?.receiverID
    );
    return (
        <div className="border-b-[1px] flex items-center justify-between">
            <div className="p-4 flex items-center gap-3">
                <div className="sm:hidden block cursor-pointer" onClick={() => setWindowChat({})}>
                    <ChevronLeft />
                </div>
                <div className="cursor-pointer" onClick={handleShowDetail}>
                    <img className="w-[35px] h-[35px] rounded-full object-cover" src={user?.photoURL} alt="" />
                </div>
                <div className="flex-1 flex flex-col cursor-pointer" onClick={handleShowDetail}>
                    <h3 className="font-semibold line-clamp-1">
                        {user?.name}{" "}
                        {user?.verified && (
                            <BsFillCheckCircleFill className="text-[12px] inline text-[#5890ff] dark:text-primary1 mb-[5px] ml-[2px]" />
                        )}
                    </h3>
                    <span className="line-clamp-1 text-[12px] text-green-400 font-medium mt-[-6px]">
                        {t("chats.online")}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 p-4 text-blue-600 dark:text-primary1">
                <Call className="cursor-pointer" />
                <VideoCall className="cursor-pointer" />
                <MoreHoriz className="cursor-pointer" />
            </div>
        </div>
    );
};

export default Header;
