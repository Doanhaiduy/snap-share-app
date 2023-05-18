import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { Spin } from "antd";
import { doc, getDoc, collection, query, where, getDocs, onSnapshot, orderBy, limit } from "firebase/firestore";

export const AuthContext = createContext();

const initialState = {
    currentUser: null,
    isCurrentUser: false,
    isLoading: true,
    userInfo: {},
    userPosts: [],
};

const actionTypes = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
    SET_IS_CURRENT_USER: "SET_IS_CURRENT_USER",
    SET_LOADING: "SET_LOADING",
    SET_USER_INFO: "SET_USER_INFO",
    SET_USER_POSTS: "SET_USER_POSTS",
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
        default:
            return state;
    }
};

function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { currentUser, isCurrentUser, isLoading, userInfo, userPosts } = state;

    const getUserInfo = async (uid) => {
        const docRef = doc(db, "users", uid);
        const userDoc = await getDoc(docRef);
        dispatch({ type: actionTypes.SET_USER_INFO, payload: userDoc.data() });
        if (userDoc.data()?.uid === currentUser?.uid) {
            localStorage.setItem("currentProfile", JSON.stringify(userDoc.data()));
        }
    };

    const getUserPost = async (uid) => {
        const q = uid
            ? query(collection(db, "posts"), where("uidUser", "==", uid))
            : query(collection(db, "posts"), where("public", "==", true), orderBy("releaseDate", "desc"), limit(15));

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
            getUserPost(currentUser?.uid);
        });
        return () => {
            unsubscribe();
            unsubscribePosts();
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
