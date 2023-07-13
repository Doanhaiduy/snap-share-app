import React, { useContext } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import useUser from "~/hooks/useUser";

function FriendActiveItem({ uid }) {
    const { user } = useUser(uid);
    const { setCurrentProfile } = useContext(ProfileContext);

    return (
        <Link
            to={`/profile/${user?.nameId || user?.uid}`}
            onClick={() => {
                localStorage.setItem("currentProfile", JSON.stringify(user));
                setCurrentProfile(user);
            }}
            className="flex items-center gap-4 "
        >
            <img className="w-[35px] h-[35px] object-cover rounded-[12px]" src={user?.photoURL} alt="" />

            <h2 className="font-bold flex-1 line-clamp-2">{user?.name}</h2>
            <AiOutlineEllipsis className="text-[30px] font-bold cursor-pointer" />
        </Link>
    );
}

export default FriendActiveItem;
