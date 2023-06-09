import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import { doc, setDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase-config";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { Spin } from "antd";
import moment from "moment";

function ItemUserManager({ user, t }) {
    const { setCurrentProfile } = useContext(ProfileContext);
    const [isVerify, setIsVerify] = useState(() => {
        if (user?.verified === undefined) {
            return false;
        } else {
            return user?.verified;
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const handleVerify = async () => {
        setIsLoading(true);
        try {
            await setIsVerify(true);
            const userRef = doc(db, "users", user?.uid);
            await setDoc(userRef, { verified: true }, { merge: true });
        } catch (error) {
            console.log("Error verifying user:", error);
            setIsVerify(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnVerify = async () => {
        setIsLoading(true);
        try {
            await setIsVerify(false);
            const userRef = doc(db, "users", user?.uid);
            await setDoc(userRef, { verified: false }, { merge: true });
        } catch (error) {
            console.log("Error unverifying user:", error);
            setIsVerify(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <li className="bg-white dark:bg-[#282828] rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
                <img src={user.photoURL} alt="Avatar" className="w-[50px] h-[50px] rounded-full mr-2" />
                <span className="font-bold text-[20px]">
                    {user.name}
                    {user?.verified && (
                        <BsFillCheckCircleFill className="text-[16px] inline text-[#5890ff] dark:text-primary1  ml-[6px] mb-[4px]" />
                    )}
                </span>
            </div>
            <p className="text-sm text-gray-500 mb-2 h-[40px] line-clamp-2">{user.bio || "No bio"}</p>
            <p className="text-xs text-gray-400 ">
                {t("admin.registered")}:{" "}
                {moment().diff(user.joinDate, "days") > 30 ? user.joinDate : moment(user.joinDate).fromNow()}
            </p>
            <div className="mt-4 flex justify-between">
                <Link
                    to={`/profile/${user?.nameId || user?.uid}`}
                    onClick={() => {
                        localStorage.setItem("currentProfile", JSON.stringify(user));
                        setCurrentProfile(user);
                    }}
                    className="rounded-lg font-medium bg-transparent border border-blue-500 text-blue-500 dark:border-primary1 dark:text-primary1 px-4 py-1"
                >
                    {t("admin.view")}
                </Link>

                {isLoading ? (
                    <button className="font-bold py-1 px-2 rounded-lg" disabled>
                        <Spin />
                    </button>
                ) : isVerify ? (
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg"
                        onClick={handleUnVerify}
                    >
                        {t("admin.unverify")}
                    </button>
                ) : (
                    <button
                        className="inline-flex items-center gap-2 justify-center px-4 py-1 font-sans font-semibold tracking-wide text-white bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-lg"
                        onClick={handleVerify}
                    >
                        {t("admin.verify")}
                    </button>
                )}
            </div>
        </li>
    );
}

export default ItemUserManager;
