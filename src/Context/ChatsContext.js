import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "~/firebase/firebase-config";
import useUser from "~/hooks/useUser";
import { AuthContext } from "./AuthContextProvider";
import { format } from "date-fns";

export const ChatsContext = createContext();

function ChatsContextProvider({ children }) {
    const { currentUser } = useContext(AuthContext);
    const [windowChat, setWindowChat] = useState({});
    // const [listContact, setListContact] = useState([]);
    const { user } = useUser(currentUser?.uid);
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    useEffect(() => {
        const unsubscribe = () => {};
        return unsubscribe;
    }, []);

    const getWindowChat = async (uid) => {
        const docRef = doc(db, "chats", uid);

        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                setWindowChat(doc.data());
            } else {
                // Handle the case when the document doesn't exist
            }
        });

        return unsubscribe;
    };

    const chooseListContact = async (currentUser, targetUser, text, timestamp) => {
        const alreadyUser = user?.listContact?.some((item) => item.id === targetUser?.uid);
        if (!alreadyUser) {
            const currentUserRef = doc(db, "users", user?.uid);
            // const targetUserRef = doc(db, "users", targetUser?.uid);
            const newListContactCurrent = !!user?.listContact
                ? [{ id: targetUser?.uid, lastMessage: text || "", timestamp: currentDate }, ...user?.listContact]
                : [{ id: targetUser?.uid, lastMessage: text || "", timestamp: currentDate }];
            user.listContact = newListContactCurrent;
            await updateDoc(currentUserRef, { listContact: newListContactCurrent });
        } else {
            if (text) {
                const targetUserRef = doc(db, "users", targetUser?.uid);
                const newListContactTarget = [{ id: user?.uid, lastMessage: text, timestamp }];
                targetUser.listContact = newListContactTarget;
                await updateDoc(targetUserRef, { listContact: newListContactTarget });
            }
        }
    };

    const updateLastMessage = async (currentUser, targetUser, lastMessage, timestamp) => {
        const currentUserRef = doc(db, "users", currentUser?.uid);
        const targetUserRef = doc(db, "users", targetUser?.uid);
        const newListContactCurrent = currentUser?.listContact?.map((contact) => {
            if (contact.id === targetUser?.uid) {
                return { id: targetUser?.uid, lastMessage, timestamp };
            }
            return contact;
        });

        const newListContactTarget = targetUser?.listContact?.map((contact) => {
            if (contact.id === currentUser?.uid) {
                return { id: currentUser?.uid, lastMessage, timestamp };
            }
            return contact;
        });

        await updateDoc(currentUserRef, { listContact: newListContactCurrent });
        if (targetUser?.listContact) {
            await updateDoc(targetUserRef, { listContact: newListContactTarget });
        }
        if (!targetUser?.listContact) {
            await chooseListContact(currentUser, targetUser, lastMessage, timestamp);
        } else {
            if (!targetUser.listContact.some((contact) => contact.id === currentUser?.uid)) {
                const newListContactTarget = [
                    { id: currentUser?.uid, lastMessage, timestamp },
                    ...targetUser?.listContact,
                ];

                await updateDoc(targetUserRef, { listContact: newListContactTarget });
            }
        }
    };

    return (
        <ChatsContext.Provider
            value={{ windowChat, setWindowChat, updateLastMessage, getWindowChat, chooseListContact }}
        >
            {children}
        </ChatsContext.Provider>
    );
}

export default ChatsContextProvider;
