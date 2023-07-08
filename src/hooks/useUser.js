import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "~/firebase/firebase-config";

export default function useUser(uid) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async (uid) => {
            setLoading(true);
            try {
                const docRef = doc(db, "users", uid);
                const userDoc = await getDoc(docRef);
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error getting user:", error);
                setUser(null);
            }
            setLoading(false);
        };

        if (uid) {
            const docRef = doc(db, "users", uid); // Define docRef here
            getUser(uid);
            const unsubscribe = onSnapshot(docRef, (snapshot) => {
                if (snapshot.exists()) {
                    setUser(snapshot.data());
                } else {
                    setUser(null);
                }
            });
            return () => unsubscribe();
        } else {
            setUser(null);
        }
    }, [uid]);

    return { user, setUser, loading };
}
