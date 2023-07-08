import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { db } from "~/firebase/firebase-config";
import useUser from "~/hooks/useUser";

const AcceptFriend = ({ targetUser }) => {
    const { t } = useContext(MultiLanguageContext);
    const { currentUser } = useContext(AuthContext);
    const { user } = useUser(currentUser.uid);
    const handleAccept = async () => {
        const currentUserRef = doc(db, "users", user?.uid);
        const targetUserRef = doc(db, "users", targetUser?.uid);
        try {
            const newFriendRequestCurrent = user?.friendRequest?.filter((item) => item !== targetUser.uid);
            const newFriendCurrent = user?.friend ? [...user?.friend, targetUser.uid] : [targetUser.uid];
            await updateDoc(currentUserRef, { friendRequest: newFriendRequestCurrent, friend: newFriendCurrent });
            const newFriendRequestTarget = targetUser?.friendRequest?.filter((item) => item !== user.uid);
            const newFriendTarget = targetUser?.friend ? [...targetUser?.friend, user.uid] : [user.uid];
            await updateDoc(targetUserRef, { friendRequest: newFriendRequestTarget || [], friend: newFriendTarget });
        } catch (error) {
            console.error("Error accept friend:", error);
        }
    };
    return (
        <button
            className="inline-flex items-center justify-center px-4 text-[0.8rem] xl:text-[1rem] xl:px-4 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-lg h-[40px]"
            onClick={handleAccept}
        >
            {t("suggestion.request.accept")}
        </button>
    );
};

export default AcceptFriend;
