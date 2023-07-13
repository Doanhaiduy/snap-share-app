import { format } from "date-fns";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { BiMessage } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "~/Context/AuthContextProvider";
import { ChatsContext } from "~/Context/ChatsContext";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import { db } from "~/firebase/firebase-config";

function Message({ isMobile }) {
    const { currentUser, userInfo } = useContext(AuthContext);
    const { setCurrentProfile, currentProfile } = useContext(ProfileContext);
    const { windowChat, getWindowChat, chooseListContact } = useContext(ChatsContext);
    const { t } = useContext(MultiLanguageContext);
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    const handleMessage = async () => {
        const combinedId =
            userInfo?.uid < currentProfile?.uid
                ? userInfo?.uid + currentProfile.uid
                : currentProfile?.uid + userInfo?.uid;
        try {
            const docRef = doc(db, "chats", combinedId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                // create chat in chats collection
                await setDoc(docRef, {
                    id: combinedId,
                    senderID: currentUser?.uid,
                    receiverID: currentProfile?.uid,
                    image: [],
                    file: [],
                    link: [],
                    message: [],
                    timestamp: currentDate,
                });
                await getWindowChat(combinedId);
            }
            if (docSnap.exists()) {
                await getWindowChat(combinedId);
            }
            chooseListContact(userInfo, currentProfile);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Link
            to={"/chats"}
            className={`${
                !isMobile
                    ? "min-w-[130px] min-h-[40px]  gap-2 px-4 py-2 justify-center bg-blue-500 dark:bg-primary1 dark:hover:bg-yellow-500 dark:text-primary2 hover:bg-blue-600 text-white text-sm flex items-center font-medium rounded-md"
                    : "px-2 py-1 block rounded-t-[4px] font-semibold dark:bg-[#282828] bg-white hover:bg-slate-100 dark:hover:bg-gray-500 cursor-pointer "
            }`}
            onClick={handleMessage}
        >
            {!isMobile && <BiMessage />}
            {t("profile.message")}
        </Link>
    );
}

export default Message;
