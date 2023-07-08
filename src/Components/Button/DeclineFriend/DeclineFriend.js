import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { db } from "~/firebase/firebase-config";
import useUser from "~/hooks/useUser";
const DeclineFriend = ({ targetUser }) => {
    const { t } = useContext(MultiLanguageContext);
    const { currentUser } = useContext(AuthContext);
    const { user } = useUser(currentUser.uid);
    const handleDecline = async () => {
        const currentUserRef = doc(db, "users", user?.uid);
        const targetUserRef = doc(db, "users", targetUser?.uid);
        try {
            const newFriendRequestCurrent = user?.friendRequest?.filter((item) => item !== targetUser.uid);
            await updateDoc(currentUserRef, { friendRequest: newFriendRequestCurrent });
            const newFriendRequestTarget = targetUser?.friendRequest?.filter((item) => item !== user.uid);
            await updateDoc(targetUserRef, { friendRequest: newFriendRequestTarget || [] });
        } catch (error) {
            console.error("Error decline friend:", error);
        }
    };
    return (
        <button
            className="inline-flex items-center justify-center px-4 text-[0.8rem] xl:text-[1rem] xl:px-4 py-4 font-sans font-semibold tracking-wide text-blue-500 dark:text-primary1 dark:border-primary1 border border-blue-500 rounded-lg h-[40px]"
            onClick={handleDecline}
        >
            {t("suggestion.request.decline")}
        </button>
    );
};

export default DeclineFriend;
