import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContextProvider";

export const ProfileContext = createContext();

function ProfileContextProvider({ children }) {
    const { userInfo } = useContext(AuthContext);
    const [currentProfile, setCurrentProfile] = useState(userInfo);

    return <ProfileContext.Provider value={{ currentProfile, setCurrentProfile }}>{children}</ProfileContext.Provider>;
}

export default ProfileContextProvider;
