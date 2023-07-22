import { Spin } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { db } from "~/firebase/firebase-config";
import { LoadingOutlined } from "@ant-design/icons";
import useUser from "~/hooks/useUser";
import { BiUserPlus, BiUserX } from "react-icons/bi";
import useNotifications from "~/hooks/useNotifications";
import { v4 } from "uuid";

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

function AddFriend({ uid, uidCurrent, isMobile }) {
    const { t } = useContext(MultiLanguageContext);
    const [madeFriends, setMadeFriends] = useState(true);
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser(uidCurrent);
    const { addNotification } = useNotifications();

    useEffect(() => {
        setMadeFriends(!!user?.friendRequest?.includes(uid));
    }, [user, uid]);

    useEffect(() => {
        if (!user?.friendRequest) {
            setUser((prevUser) => ({
                ...prevUser,
                friendRequest: [],
            }));
        }
    }, [user, setUser]);
    const handleAddFriend = () => {
        const userRef = doc(db, "users", uidCurrent);
        setLoading(true);
        setTimeout(async () => {
            if (madeFriends) {
                const newFriendRequest = user?.friendRequest?.filter((item) => item !== uid);
                try {
                    await updateDoc(userRef, { friendRequest: newFriendRequest });
                    setMadeFriends(false);
                } catch (error) {
                    console.error("Error cancelling friend request:", error);
                }
            } else {
                if (!user?.friendRequest?.includes(uid)) {
                    const newFriendRequest = user?.friendRequest ? [...user?.friendRequest, uid] : [uid];
                    try {
                        await updateDoc(userRef, { friendRequest: newFriendRequest });
                        const newNotification = {
                            id: v4(),
                            uidTarget: uid,
                            type: "addFriend",
                            timestamp: new Date().getTime(),
                        };
                        await addNotification(uidCurrent, newNotification);
                        setMadeFriends(true);
                    } catch (error) {
                        console.error("Error sending friend request:", error);
                    }
                } else {
                    setMadeFriends(true);
                }
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <button
            className={`${
                !isMobile
                    ? "min-w-[130px] min-h-[40px]  gap-2 px-4 py-2 justify-center bg-blue-500 dark:bg-primary1 dark:hover:bg-yellow-500 dark:text-primary2 hover:bg-blue-600 text-white text-sm flex items-center font-medium rounded-md"
                    : "px-2 block rounded-b-[4px] py-1 w-full text-left font-semibold dark:bg-[#282828] bg-white hover:bg-slate-100 dark:hover:bg-gray-500 cursor-pointer "
            }`}
            onClick={handleAddFriend}
        >
            {loading ? (
                <Spin size="small" indicator={antIcon} className="text-white dark:text-primary2" />
            ) : madeFriends ? (
                <>
                    {!isMobile && <BiUserX />}
                    {t("profile.cancelRequest")}
                </>
            ) : (
                <>
                    {!isMobile && <BiUserPlus />}

                    {t("profile.add")}
                </>
            )}
        </button>
    );
}

export default AddFriend;
