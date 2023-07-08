import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import useUser from "~/hooks/useUser";

function FriendActiveItem({ uid }) {
    const { user } = useUser(uid);

    return (
        <div className="flex items-center gap-4">
            <img className="w-[35px] h-[35px] rounded-[12px]" src={user?.photoURL} alt="" />

            <h2 className="font-bold flex-1 line-clamp-2">{user?.name}</h2>
            <AiOutlineEllipsis className="text-[30px] font-bold cursor-pointer" />
        </div>
    );
}

export default FriendActiveItem;
