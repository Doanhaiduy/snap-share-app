import { Spin } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { db } from "~/firebase/firebase-config";
import { LoadingOutlined } from "@ant-design/icons";
import useUser from "~/hooks/useUser";
import { BiUserPlus, BiUserX } from "react-icons/bi";

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

function AddFriend({ uid, uidCurrent }) {
    const { t } = useContext(MultiLanguageContext);
    const [madeFriends, setMadeFriends] = useState(true);
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser(uidCurrent);

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-primary1 dark:hover:bg-yellow-500 dark:text-primary2 hover:bg-blue-600 justify-center text-white text-sm font-medium rounded-md min-w-[130px] min-h-[40px]"
            onClick={handleAddFriend}
        >
            {loading ? (
                <Spin size="small" indicator={antIcon} className="text-white dark:text-primary2" />
            ) : madeFriends ? (
                <>
                    <BiUserX />
                    {t("profile.cancelRequest")}
                </>
            ) : (
                <>
                    <BiUserPlus />
                    {t("profile.add")}
                </>
            )}
        </button>
    );
}

export default AddFriend;
