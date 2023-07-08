import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import AddFriend from "~/Components/Button/AddFriend/AddFriend";
import Follow from "~/Components/Button/Follow/Follow";
import UnFriend from "~/Components/Button/UnFriend/UnFriend";
import useUser from "~/hooks/useUser";

function Action({ t, uid, uidCurrent }) {
    const { user } = useUser(uid);
    const isFriend = !!user?.friend?.includes(uidCurrent);
    return (
        <div className="">
            <div className="gap-4 flex-col lg:flex-row lg:p-4 p-0  absolute right-0 lg:bottom-[-80px] bottom-[-120px] hidden sm:flex">
                {/* <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-primary5 dark:bg-gray-200 dark:hover:bg-gray-300 hover:bg-gray-600 dark:text-gray-800 text-sm font-medium rounded-md">
                <BiChat />
                Message
            </button> */}
                <Follow uid={uid} uidCurrent={uidCurrent} />
                {isFriend ? (
                    <UnFriend uid={uid} uidCurrent={uidCurrent} />
                ) : (
                    <AddFriend uid={uid} uidCurrent={uidCurrent} />
                )}
            </div>
            <div className="gap-4 flex-col absolute right-0 bottom-[-60px] z-10 shadow-lg  sm:hidden flex px-2 py-1 text-[25px] bg-white dark:bg-[#282828] dark:text-white text-primary2 rounded-[8px] group">
                <AiOutlineEllipsis />
                <ul className="absolute left-[-156px] bottom-[-80px] hidden group-hover:block hover:block rounded-[4px] overflow-hidden w-[160px] text-sm ">
                    <li className="px-2 py-1 font-semibold dark:bg-[#282828] bg-white hover:bg-slate-100 dark:hover:bg-gray-500 cursor-pointer">
                        {t("nav.mess")}
                    </li>
                    <li className="px-2 py-1 font-semibold dark:bg-[#282828] bg-white hover:bg-slate-100 dark:hover:bg-gray-500 cursor-pointer">
                        {t("profile.follow")}
                    </li>
                    <li className="px-2 py-1 font-semibold dark:bg-[#282828] bg-white hover:bg-slate-100 dark:hover:bg-gray-500 cursor-pointer">
                        {t("profile.add")}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Action;
