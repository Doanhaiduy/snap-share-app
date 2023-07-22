import { Link } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { ChatsContext } from "~/Context/ChatsContext";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

const Source = () => {
    const { t } = useContext(MultiLanguageContext);
    const { windowChat } = useContext(ChatsContext);
    const [option, setOption] = useState("media");

    return (
        <div className="">
            <p className="font-semibold p-3">{t("chats.detail.other")}</p>
            <div className="flex gap-2 px-3 py-2 font-semibold">
                <span
                    className={`py-1 px-2 cursor-pointer rounded-[25px] bg-slate-200 dark:bg-[#555] ${
                        option === "media" ? "bg-slate-400 dark:bg-[#777]" : null
                    } hover:bg-slate-400 hover:dark:bg-[#777]`}
                    onClick={() => setOption("media")}
                >
                    {t("chats.detail.media")}
                </span>
                <span
                    className={`py-1 px-2 cursor-pointer rounded-[25px] bg-slate-200 dark:bg-[#555] ${
                        option === "file" ? "bg-slate-400 dark:bg-[#777]" : null
                    } hover:bg-slate-400 hover:dark:bg-[#777] `}
                    onClick={() => setOption("file")}
                >
                    {t("chats.detail.file")}
                </span>
                <span
                    className={`py-1 px-2 cursor-pointer rounded-[25px] bg-slate-200 dark:bg-[#555] ${
                        option === "links" ? "bg-slate-400 dark:bg-[#777]" : null
                    } hover:bg-slate-400 hover:dark:bg-[#777] `}
                    onClick={() => setOption("links")}
                >
                    {t("chats.detail.links")}
                </span>
            </div>
            {option === "media" && (
                <div className="grid   grid-cols-3 p-3 gap-[8px]">
                    {windowChat?.image?.map((item, index) => (
                        <img key={index} src={item} className="object-cover rounded-[10px] h-[120px] w-full " alt="" />
                    ))}
                </div>
            )}

            {option === "links" && (
                <div className="grid   grid-cols-1 p-3 gap-[8px]">
                    {windowChat?.link?.map((item, index) => (
                        <div className="flex items-center gap-2 py-2 border-b-[1px] ">
                            <div className="w-[40px] h-[40px] flex items-center justify-center dark:bg-[#555] bg-slate-200 rounded-[6px]">
                                <Link />
                            </div>
                            <a
                                href={item}
                                target="_blank"
                                key={index}
                                className="w-full font-semibold underline"
                                alt=""
                                rel="noreferrer"
                            >
                                {item}
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {option === "file" && (
                <div className="grid   grid-cols-1 p-3 gap-[8px]">
                    <p>no files yet</p>
                </div>
            )}
        </div>
    );
};

export default Source;
