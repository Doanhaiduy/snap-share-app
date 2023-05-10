import React, { createContext, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { Spin } from "antd";
import { doc, getDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const [userPosts, setUserPosts] = useState([]);

    const getUserInfo = async (uid) => {
        const docRef = doc(db, "users", uid);
        const userDoc = await getDoc(docRef);
        setUserInfo(userDoc.data());
        localStorage.setItem("currentProfile", JSON.stringify(userDoc.data()));
    };

    const getUserPost = async (uid) => {
        const q = uid
            ? query(collection(db, "posts"), where("uidUser", "==", uid))
            : query(collection(db, "posts"), where("public", "==", true));

        const querySnapshot = await getDocs(q);
        const listPostTeamp = querySnapshot.docs.map((doc) => doc.data());
        setUserPosts(listPostTeamp);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                getUserPost(user.uid);
                getUserInfo(user.uid);
                setIsCurrentUser(true);
                setIsLoading(false);
            } else {
                setCurrentUser(null);
                setIsCurrentUser(false);
                setIsLoading(false);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authProviderValue = useMemo(
        () => ({
            currentUser,
            isCurrentUser,
            userInfo,
            getUserInfo,
            userPosts,
            getUserPost,
        }),
        [currentUser, isCurrentUser, userInfo, userPosts]
    );

    return (
        <AuthContext.Provider value={authProviderValue}>
            {isLoading ? (
                <div className="flex items-center justify-center h-[100vh]">
                    <Spin size="large" />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
