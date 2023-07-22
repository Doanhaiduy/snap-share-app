import { useState } from "react";
import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase-config";

export default function useNotifications() {
    const [addingNotification, setAddingNotification] = useState(false);

    const addNotification = async (uid, notification) => {
        setAddingNotification(true);
        try {
            const userRef = doc(db, "users", uid);

            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const notifications = Array.isArray(userData.notifications) ? userData.notifications : [];

                const updatedNotifications = [...notifications, notification];
                await updateDoc(userRef, {
                    notifications: updatedNotifications,
                    unreadNotifications: userData.unreadNotifications + 1 || 1,
                });
            }
        } catch (error) {
            console.error("Error adding notification:", error);
        }
        setAddingNotification(false);
    };
    const deleteAllNotifications = async (uid) => {
        setAddingNotification(true);
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, { notifications: deleteField() });
        } catch (error) {
            console.error("Error deleting notifications:", error);
        }
        setAddingNotification(false);
    };

    const seeNotifications = async (uid) => {
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, { unreadNotifications: 0 });
        } catch (error) {
            console.error("Error deleting notifications:", error);
        }
    };

    return { addNotification, addingNotification, deleteAllNotifications, seeNotifications };
}
