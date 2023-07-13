import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import AddFriend from "~/Components/Button/AddFriend/AddFriend";
import Follow from "~/Components/Button/Follow/Follow";
import Message from "~/Components/Button/Message/Message";
import UnFriend from "~/Components/Button/UnFriend/UnFriend";
import useUser from "~/hooks/useUser";

function Action({ t, uid, uidCurrent }) {
    const { user } = useUser(uid);
    const isFriend = !!user?.friend?.includes(uidCurrent);
    return (
        <div className="">
            <div className="gap-2 flex-col lg:flex-row lg:p-4 p-0  absolute right-0 lg:bottom-[-120px] xl:bottom-[-80px] bottom-[-145px] hidden sm:flex max-w-[300px] xl:max-w-[450px] flex-wrap">
                <Message />
                <Follow uid={uid} uidCurrent={uidCurrent} />
                {isFriend ? (
                    <UnFriend uid={uid} uidCurrent={uidCurrent} />
                ) : (
                    <AddFriend uid={uid} uidCurrent={uidCurrent} />
                )}
            </div>
            <div className="gap-4 flex-col absolute right-0 bottom-[-60px] z-10 shadow-lg  sm:hidden flex px-2 py-1 text-[25px] bg-white dark:bg-[#282828] dark:text-white text-primary2 rounded-[8px] group">
                <AiOutlineEllipsis />
                <ul className="absolute pseudo-action left-[-156px] bottom-[-80px] hidden group-hover:block hover:block rounded-[4px] w-[160px] text-sm ">
                    <Message isMobile={true} />
                    <Follow uid={uid} uidCurrent={uidCurrent} isMobile={true} />
                    {isFriend ? (
                        <UnFriend uid={uid} uidCurrent={uidCurrent} isMobile={true} />
                    ) : (
                        <AddFriend uid={uid} uidCurrent={uidCurrent} isMobile={true} />
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Action;
