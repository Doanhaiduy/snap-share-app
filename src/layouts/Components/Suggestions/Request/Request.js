import React, { useContext, useEffect } from "react";
import RequestItem from "./RequestItem";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { AuthContext } from "~/Context/AuthContextProvider";
import useUser from "~/hooks/useUser";

function Request({ isMobile }) {
    const { currentUser } = useContext(AuthContext);
    const { t } = useContext(MultiLanguageContext);
    const { user } = useUser(currentUser?.uid);
    useEffect(() => {});
    return (
        <div className={`${!isMobile && "lg:block hidden"}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold uppercase text-gray-500 ">{t("suggestion.request.title")}</h3>
                <span className="flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-full text-white">
                    <span className="text-sm">{user?.friendRequest?.length || "0"}</span>
                </span>
            </div>
            <div className="flex flex-col gap-3">
                {user?.friendRequest?.map((item) => (
                    <RequestItem t={t} key={item} uid={item} />
                ))}
            </div>
        </div>
    );
}

export default Request;
