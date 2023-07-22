import React, { useContext, useEffect, useRef, useState } from "react";
import { Notifications } from "@mui/icons-material";
import HeadlessTippy from "@tippyjs/react/headless";
import NotificationItem from "./NotificationItem";
import { AuthContext } from "~/Context/AuthContextProvider";
import useUser from "~/hooks/useUser";
import useNotifications from "~/hooks/useNotifications";
import { Badge } from "@mui/material";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

const Notification = ({ showNotification, setShowNotification }) => {
    const { deleteAllNotifications, seeNotifications } = useNotifications();
    const { currentUser } = useContext(AuthContext);
    const { user } = useUser(currentUser?.uid);
    const { t } = useContext(MultiLanguageContext);

    const newNotification = useRef();
    useEffect(() => {
        newNotification.current = user?.unreadNotifications;
    }, [user?.unreadNotifications]);
    return (
        <>
            <HeadlessTippy
                interactive
                placement="bottom"
                visible={showNotification}
                render={() => (
                    <div className="w-[360px] h-[600px] shadow-xl   dark:text-white overflow-y-hidden  hover:overflow-y-auto  bg-white p-3 pr-[20px] dark:bg-[#282828] rounded-[10px] pb-[24px]">
                        <h2 className="font-semibold text-[22px]">{t("notifications.title")}</h2>
                        <hr />
                        <div className="">
                            <span className="font-semibold text-[18px]">{t("notifications.new")}</span>
                            <div className="">
                                {user?.notifications
                                    ?.sort((a, b) => b.timestamp - a.timestamp)
                                    .slice(0, newNotification.current)
                                    .map((item) => (
                                        <NotificationItem
                                            key={item.id}
                                            time={item.timestamp}
                                            type={item.type}
                                            uidTarget={item.uidTarget}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div className="">
                            <span className="font-semibold text-[18px]">{t("notifications.earlier")}</span>
                            <div className="">
                                {user?.notifications
                                    ?.sort((a, b) => b.timestamp - a.timestamp)
                                    .slice(newNotification.current)
                                    .map((item) => (
                                        <NotificationItem
                                            key={item.id}
                                            time={item.timestamp}
                                            type={item.type}
                                            uidTarget={item.uidTarget}
                                            notification={item}
                                        />
                                    ))}
                            </div>
                        </div>
                        <p
                            className="font-medium text-center hover:opacity-90 cursor-pointer w-full bg-slate-100 dark:bg-[#333] absolute bottom-0 rounded-[4px]"
                            onClick={() => deleteAllNotifications(currentUser?.uid)}
                        >
                            {t("notifications.delete")}
                        </p>
                    </div>
                )}
                onClickOutside={() => setShowNotification(false)}
            >
                <div
                    className="h-[40px] cursor-pointer hover:opacity-90 w-[40px] rounded-[12px] flex items-center justify-center bg-blue-600 dark:bg-primary1"
                    onClick={() => {
                        setShowNotification(!showNotification);
                        seeNotifications(currentUser?.uid);
                    }}
                >
                    <Badge badgeContent={user?.unreadNotifications} color="error">
                        <Notifications className="text-white dark:text-black" />
                    </Badge>
                </div>
            </HeadlessTippy>
        </>
    );
};

export default Notification;
