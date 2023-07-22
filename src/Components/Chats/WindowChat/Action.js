import { GifBox, Image, Send } from "@mui/icons-material";
import { Spin } from "antd";
import { format } from "date-fns";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import { ChatsContext } from "~/Context/ChatsContext";
import { db } from "~/firebase/firebase-config";
import useUser from "~/hooks/useUser";
import { LoadingOutlined } from "@ant-design/icons";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import useCreateImage from "~/hooks/useCreateImage";

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

const Action = () => {
    const { windowChat, getWindowChat } = useContext(ChatsContext);
    const { t } = useContext(MultiLanguageContext);
    const [text, setText] = useState("");
    const [gif, setGif] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const [image, handleCreateImage, setImage] = useCreateImage();

    const { currentUser: data } = useContext(AuthContext);
    const { updateLastMessage } = useContext(ChatsContext);
    const { user: currentUser } = useUser(data?.uid);
    const { user: targetUser } = useUser(
        windowChat?.senderID === currentUser?.uid ? windowChat?.receiverID : windowChat?.senderID
    );
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSendMessage = async () => {
        if ((text.trim() !== "" && !loading && windowChat.senderID !== undefined) || image) {
            // if ( || text.startsWith("http://")) {
            //     console.log("đây là link: ", text);
            // }
            setLoading(true);
            const combinedId =
                windowChat?.senderID < windowChat?.receiverID
                    ? windowChat?.senderID + windowChat?.receiverID
                    : windowChat?.receiverID + windowChat?.senderID;
            try {
                const docRef = doc(db, "chats", combinedId);
                // const docRefCheck = doc(db, "chats", combinedIdCheck);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    await updateDoc(docRef, {
                        message: [
                            ...windowChat.message,
                            {
                                text,
                                timestamp: currentDate,
                                senderID: currentUser?.uid,
                                receiverID:
                                    windowChat?.senderID === currentUser?.uid
                                        ? windowChat?.receiverID
                                        : windowChat?.senderID,
                                image,
                                gif,
                            },
                        ],
                        image: image ? [image, ...windowChat.image] : windowChat.image,
                        link: text.startsWith("https://") ? [text, ...windowChat.link] : windowChat.link,
                    });
                    await updateLastMessage(
                        currentUser,
                        targetUser,
                        text === "" && image ? "Sent an image" : text,
                        currentDate
                    );
                }
                setText("");
                setImage(null);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };
    return (
        <div className="p-3 flex items-center gap-3">
            <div className="">
                <input
                    type="file"
                    className="hidden"
                    id="image"
                    onChange={(e) => handleCreateImage(e, "chats", setLoadingImage)}
                />
                <label htmlFor="image">
                    <Image className="text-[2.4rem] cursor-pointer" />
                </label>

                <GifBox className="cursor-pointer" />
            </div>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`flex-1 bg-[#f8f8f8] dark:bg-[#373737] p-2 rounded-[10px] outline-none ${
                    loading && "text-transparent"
                }`}
                type="text"
                placeholder={t("chats.windowChat.placeholder")}
                onKeyDown={(e) => handleEnter(e)}
                ref={inputRef}
            />
            {loadingImage ? (
                <Spin size="small" indicator={antIcon} className="text-blue-600 dark:text-primary1" />
            ) : (
                image && <img src={image} className="w-[40px] h-[40px] rounded-[4px] object-cover" alt="" />
            )}

            <div className="text-blue-600 dark:text-primary1" onClick={handleSendMessage}>
                {loading ? (
                    <Spin size="small" indicator={antIcon} className="text-blue-600 dark:text-primary1" />
                ) : (
                    <Send className="cursor-pointer" />
                )}
            </div>
        </div>
    );
};

export default Action;
