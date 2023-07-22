import moment from "moment";
import React, { useContext } from "react";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import useUser from "~/hooks/useUser";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

const Message = ({ owner, mess }) => {
    const { user: senderUser } = useUser(mess.senderID);
    const { t } = useContext(MultiLanguageContext);

    return !owner ? (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                    <img className="w-full h-full rounded-full object-cover" src={senderUser.photoURL} alt="" />
                </div>
                <Tippy
                    content={<span className="text-[12px]">{moment(mess?.timestamp).format("HH:mm DD/MM/YYYY")}</span>}
                >
                    <div className="relative  group max-w-[80%] ml-3 text-sm bg-slate-100 dark:bg-[#383838] dark:text-white py-2 whitespace-normal px-4 shadow rounded-xl">
                        <picture className="break-words relative line-clamp-1">
                            {mess.text.startsWith("https://") ? (
                                <a href={mess.text} target="_blank" className="underline" rel="noopener noreferrer">
                                    {mess.text}
                                </a>
                            ) : (
                                mess.text
                            )}

                            <span className="text-[8px] absolute bottom-[-30px] left-[-10px] w-[100px] ">
                                {moment().diff(mess.timestamp, "days") > 30
                                    ? mess.timestamp
                                    : moment(mess.timestamp).fromNow()}
                            </span>
                        </picture>
                    </div>
                </Tippy>
            </div>
            {mess.image && <img className="max-w-[60%] ml-12 mt-5 rounded-[12px]" src={mess.image} alt="" />}
        </div>
    ) : (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 flex-shrink-0">
                    <img className="w-full h-full rounded-full object-cover" src={senderUser.photoURL} alt="" />
                </div>
                <Tippy
                    content={<span className="text-[12px]">{moment(mess?.timestamp).format("HH:mm DD/MM/YYYY")}</span>}
                >
                    <div className="relative max-w-[80%] mr-3 group text-sm bg-blue-600 dark:bg-primary1 dark:text-primary2 text-white py-2 whitespace-normal px-4 shadow rounded-xl">
                        <p className="break-words relative line-clamp-1">
                            {mess.text.startsWith("https://") ? (
                                <a href={mess.text} target="_blank" className="underline" rel="noopener noreferrer">
                                    {mess.text}
                                </a>
                            ) : (
                                mess.text
                            )}
                            <span className="text-[8px] absolute bottom-[-30px] right-[-10px] text-right w-[100px] text-black dark:text-white">
                                {t("chats.detail.sent")}{" "}
                                {moment().diff(mess.timestamp, "days") > 30
                                    ? mess.timestamp
                                    : moment(mess.timestamp).fromNow()}
                            </span>
                        </p>
                    </div>
                </Tippy>
            </div>
            {mess.image && (
                <img
                    className="max-w-[60%] max-h-[600px] mr-12 float-right mt-5 rounded-[12px]"
                    src={mess.image}
                    alt=""
                />
            )}
        </div>
    );
};

export default Message;
