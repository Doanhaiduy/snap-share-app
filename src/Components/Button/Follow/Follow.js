import { BiPlus } from "react-icons/bi";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { Spin } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { db } from "~/firebase/firebase-config";
import { LoadingOutlined } from "@ant-design/icons";
import useUser from "~/hooks/useUser";
const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

function Follow({ uid, uidCurrent, isMobile }) {
    const { t } = useContext(MultiLanguageContext);
    const [madeFollow, setMadeFollow] = useState(true);
    const [loading, setLoading] = useState(false);
    const { user: currentUser, setUser } = useUser(uid);
    const { user: targetUser } = useUser(uidCurrent);
    useEffect(() => {
        setMadeFollow(!!targetUser?.followers?.includes(uid));
    }, [targetUser, uid]);
    useEffect(() => {
        if (!currentUser?.followers) {
            setUser((prevUser) => ({
                ...prevUser,
                followers: [],
            }));
        }
    }, [currentUser, setUser]);

    const handleFollow = async () => {
        const currentUserRef = doc(db, "users", uid);
        const targetUserRef = doc(db, "users", uidCurrent);
        setLoading(true);
        try {
            if (madeFollow) {
                // Unfollow
                const newFollowers = targetUser?.followers?.filter((item) => item !== uid);
                await updateDoc(targetUserRef, { followers: newFollowers });

                // console.log("before: ", currentUser?.following);
                // console.log("===========================");
                const newFollowing = currentUser?.following?.filter((item) => item !== uidCurrent);
                await updateDoc(currentUserRef, { following: newFollowing || [] });
                setMadeFollow(false);
                // console.log("after: ", newFollowing);
                // console.log("===========================");
                currentUser.following = newFollowing;
            } else {
                // Follow
                if (!targetUser?.followers?.includes(uid)) {
                    const newFollowers = targetUser?.followers ? [...targetUser?.followers, uid] : [uid];
                    await updateDoc(targetUserRef, { followers: newFollowers });
                }
                if (!currentUser?.following?.includes(uidCurrent)) {
                    // console.log("before: ", currentUser?.following);
                    // console.log("===========================");
                    const newFollowing = currentUser?.following
                        ? [...currentUser?.following, uidCurrent]
                        : [uidCurrent];
                    await updateDoc(currentUserRef, { following: newFollowing });
                    currentUser.following = newFollowing;
                    // console.log("after: ", newFollowing);
                    // console.log("===========================");
                }
                setMadeFollow(true);
            }
        } catch (error) {
            console.error("Error updating follow status:", error);
        }
        setLoading(false);
    };

    return (
        <button
            className={`${
                !isMobile
                    ? "min-w-[130px] min-h-[40px]  gap-2 px-4 py-2 justify-center bg-blue-500 dark:bg-primary1 dark:hover:bg-yellow-500 dark:text-primary2 hover:bg-blue-600 text-white text-sm flex items-center font-medium rounded-md"
                    : "px-2 block py-1 w-full text-left font-semibold dark:bg-[#282828] bg-white hover:bg-slate-100 dark:hover:bg-gray-500 cursor-pointer "
            }`}
            onClick={handleFollow}
        >
            {loading ? (
                <Spin size="small" indicator={antIcon} className="text-white dark:text-primary2" />
            ) : madeFollow ? (
                <>
                    {!isMobile && <AiOutlineUsergroupDelete />}
                    {t("profile.unFollow")}
                </>
            ) : (
                <>
                    {!isMobile && <BiPlus />}
                    {t("profile.follow")}
                </>
            )}
        </button>
    );
}

export default Follow;
