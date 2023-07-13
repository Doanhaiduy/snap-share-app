import React, { useContext } from "react";
import { ChatsContext } from "~/Context/ChatsContext";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

const Source = () => {
    const { t } = useContext(MultiLanguageContext);
    const { windowChat } = useContext(ChatsContext);

    return (
        <div className="">
            <p className="font-semibold p-3">{t("chats.detail.other")}</p>
            <div className="flex gap-2 px-3 py-2 font-semibold">
                <span className="py-1 px-2 cursor-pointer rounded-[25px] bg-slate-400  dark:bg-[#777]">
                    {t("chats.detail.media")}
                </span>
                <span className="py-1 px-2 cursor-pointer rounded-[25px] bg-slate-200 dark:bg-[#555]">
                    {t("chats.detail.file")}
                </span>
                <span className="py-1 px-2 cursor-pointer rounded-[25px] bg-slate-200 dark:bg-[#555]">
                    {t("chats.detail.links")}
                </span>
            </div>
            <div className="grid grid-cols-3 p-3 gap-[8px]">
                {windowChat?.image?.map((item, index) => (
                    <img key={index} src={item} className="object-cover rounded-[10px] h-[120px] w-full " alt="" />
                ))}
            </div>
        </div>
    );
};

export default Source;
