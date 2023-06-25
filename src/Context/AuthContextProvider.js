import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { Spin } from "antd";
import { doc, getDoc, collection, query, where, getDocs, onSnapshot, orderBy, limit, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

const initialState = {
    currentUser: null,
    isCurrentUser: false,
    isLoading: true,
    userInfo: {},
    userPosts: [],
    pinnedPosts: [],
};

const actionTypes = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
    SET_IS_CURRENT_USER: "SET_IS_CURRENT_USER",
    SET_LOADING: "SET_LOADING",
    SET_USER_INFO: "SET_USER_INFO",
    SET_USER_POSTS: "SET_USER_POSTS",
    SET_PIN_POSTS: "SET_PIN_POSTS",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case actionTypes.SET_IS_CURRENT_USER:
            return {
                ...state,
                isCurrentUser: action.payload,
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case actionTypes.SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            };
        case actionTypes.SET_USER_POSTS:
            return {
                ...state,
                userPosts: action.payload,
            };
        case actionTypes.SET_PIN_POSTS:
            return {
                ...state,
                pinnedPosts: action.payload,
            };
        default:
            return state;
    }
};

function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentUser, isCurrentUser, isLoading, userInfo, userPosts, pinnedPosts } = state;

    const getUserInfo = async (uid) => {
        const docRef = doc(db, "users", uid);
        const userDoc = await getDoc(docRef);
        dispatch({ type: actionTypes.SET_USER_INFO, payload: userDoc.data() });
        if (userDoc.data()?.uid === currentUser?.uid) {
            localStorage.setItem("currentProfile", JSON.stringify(userDoc.data()));
        }
    };

    const getUserPost = async (uid, limitCount = 5) => {
        let q;
        if (uid !== null) {
            if (uid === undefined) {
                return;
            }
            if (uid === auth.currentUser?.uid) {
                q = query(collection(db, "posts"), where("uidUser", "==", uid), orderBy("releaseDate", "desc"));
            } else {
                q = query(
                    collection(db, "posts"),
                    where("uidUser", "==", uid),
                    where("public", "==", true),
                    orderBy("releaseDate", "desc")
                );
            }
        } else {
            q = query(
                collection(db, "posts"),
                where("public", "==", true),
                orderBy("releaseDate", "desc"),
                limit(limitCount)
            );
        }
        const querySnapshot = await getDocs(q);
        const listPostTemp = querySnapshot.docs.map((doc) => doc.data());
        dispatch({ type: actionTypes.SET_USER_POSTS, payload: listPostTemp });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
                getUserPost(user.uid);
                getUserInfo(user.uid);
                dispatch({ type: actionTypes.SET_IS_CURRENT_USER, payload: true });
                dispatch({ type: actionTypes.SET_LOADING, payload: false });
            } else {
                dispatch({ type: actionTypes.SET_CURRENT_USER, payload: null });
                dispatch({ type: actionTypes.SET_IS_CURRENT_USER, payload: false });
                dispatch({ type: actionTypes.SET_LOADING, payload: false });
            }
        });

        const unsubscribePosts = onSnapshot(collection(db, "posts"), (snapshot) => {
            if (snapshot.docChanges().length > 0) {
                if (window.location.pathname === "/") {
                    getUserPost(currentUser?.uid);
                    getUserPost(null);
                }
            }
        });
        return () => {
            unsubscribe();
            unsubscribePosts();
        };
    }, []);

    const setPinPost = async (uid) => {
        if (uid) {
            const docRef = doc(db, "posts", uid);
            await setDoc(docRef, { isPinPost: true }, { merge: true });
        }
        const q = query(collection(db, "posts"), where("isPinPost", "==", true));
        const querySnapshot = await getDocs(q);
        const listPinPosts = querySnapshot.docs.map((doc) => doc.data());
        dispatch({ type: actionTypes.SET_PIN_POSTS, payload: listPinPosts });
    };
    const unPinPost = async (uid) => {
        if (uid) {
            const docRef = doc(db, "posts", uid);
            await setDoc(docRef, { isPinPost: false }, { merge: true });
        }
        const q = query(collection(db, "posts"), where("isPinPost", "==", true));
        const querySnapshot = await getDocs(q);
        const listPinPosts = querySnapshot.docs.map((doc) => doc.data());
        dispatch({ type: actionTypes.SET_PIN_POSTS, payload: listPinPosts });
    };
    const authProviderValue = useMemo(
        () => ({
            currentUser,
            isCurrentUser,
            userInfo,
            userPosts,
            pinnedPosts,
            getUserInfo,
            getUserPost,
            setPinPost,
            unPinPost,
        }),
        [currentUser, isCurrentUser, unPinPost, userInfo, userPosts, setPinPost, pinnedPosts]
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
