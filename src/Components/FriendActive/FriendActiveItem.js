import React from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

function FriendActiveItem() {
    return (
        <div className="flex items-center gap-4">
            <img className="w-[35px] h-[35px] rounded-[12px]" src="https://source.unsplash.com/random" alt="" />

            <h2 className="font-bold flex-1 line-clamp-2">Doan Hai Duy</h2>
            <AiOutlineEllipsis className="text-[30px] font-bold cursor-pointer" />
        </div>
    );
}

export default FriendActiveItem;
