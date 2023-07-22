import moment from "moment";
import React, { useContext } from "react";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import useUser from "~/hooks/useUser";

const NotificationItem = ({ type, uidTarget, time, notification }) => {
    const { user } = useUser(uidTarget);
    const { t } = useContext(MultiLanguageContext);

    const showNotification = (type) => {
        switch (type) {
            case "addFriend":
                return t("notifications.addFriend");
            case "acceptFriend":
                return t("notifications.acceptFriend");
            case "follow":
                return t("notifications.follow");
            case "mess":
                return t("notifications.mess");
            case "comment":
                return t("notifications.comment");
            case "like":
                return t("notifications.like");
            default:
                break;
        }
    };
    return (
        <div className="">
            <div className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-[#383838] rounded-[12px] cursor-pointer">
                <img src={user?.photoURL} alt="" className="w-[50px] h-[50px]  object-cover rounded-[12px]" />
                <div className="flex-1">
                    <p className="line-clamp-2">
                        <strong>{user?.name} </strong>
                        {showNotification(type)}
                        {notification?.content && <span>: {notification?.content}</span>}
                    </p>
                    <span className="text-blue-600 dark:text-primary1 font-semibold text-[12px] ">
                        {moment().diff(time, "days") > 30 ? time : moment(time).fromNow()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NotificationItem;
