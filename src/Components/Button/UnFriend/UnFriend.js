import { Spin } from "antd";
import React, { useContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import useUser from "~/hooks/useUser";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase-config";
import { BiUserMinus } from "react-icons/bi";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

const UnFriend = ({ uid, uidCurrent }) => {
    const { t } = useContext(MultiLanguageContext);

    const [loading, setLoading] = useState(false);
    const { user: currentUser } = useUser(uid);
    const { user: targetUser } = useUser(uidCurrent);
    const handleUnFriend = async () => {
        setLoading(true);
        const currentUserRef = doc(db, "users", uid);
        const targetUserRef = doc(db, "users", uidCurrent);
        try {
            const newFriendCurrent = currentUser?.friend?.filter((item) => item !== uidCurrent);
            await updateDoc(currentUserRef, { friend: newFriendCurrent });
            const newFriendTarget = targetUser?.friend?.filter((item) => item !== uid);
            await updateDoc(targetUserRef, { friend: newFriendTarget });
        } catch (error) {
            console.error("Error accept friend:", error);
        }
        setLoading(false);
    };
    return (
        <button
            className="min-w-[130px] min-h-[40px] inline-flex items-center gap-2 px-4 py-2 justify-center bg-blue-500 dark:bg-primary1 dark:hover:bg-yellow-500 dark:text-primary2 hover:bg-blue-600 text-white text-sm font-medium rounded-md"
            onClick={handleUnFriend}
        >
            {loading ? (
                <Spin size="small" indicator={antIcon} className="text-white dark:text-primary2" />
            ) : (
                <>
                    <BiUserMinus />
                    {t("profile.unFriend")}
                </>
            )}
        </button>
    );
};

export default UnFriend;
