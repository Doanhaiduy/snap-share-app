import { Spin } from "antd";
import React, { useContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import useUser from "~/hooks/useUser";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase-config";
import { BiUserMinus } from "react-icons/bi";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

const UnFriend = ({ uid, uidCurrent, isMobile }) => {
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
            className={`${
                !isMobile
                    ? "min-w-[130px] min-h-[40px]  gap-2 px-4 py-2 justify-center bg-blue-500 dark:bg-primary1 dark:hover:bg-yellow-500 dark:text-primary2 hover:bg-blue-600 text-white text-sm flex items-center font-medium rounded-md"
                    : "rounded-b-[4px] px-2 block py-1 w-full text-left font-semibold dark:bg-[#282828] bg-white hover:bg-slate-100 dark:hover:bg-gray-500 cursor-pointer "
            }`}
            onClick={handleUnFriend}
        >
            {loading ? (
                <Spin size="small" indicator={antIcon} className="text-white dark:text-primary2" />
            ) : (
                <>
                    {!isMobile && <BiUserMinus />}
                    {t("profile.unFriend")}
                </>
            )}
        </button>
    );
};

export default UnFriend;
