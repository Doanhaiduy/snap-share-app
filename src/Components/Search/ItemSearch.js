import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import { BsFillCheckCircleFill } from "react-icons/bs";

function ItemSearch({ user, handleHideResult }) {
    const { setCurrentProfile } = useContext(ProfileContext);
    return (
        <Link
            to={`/profile/${user?.nameId || user?.uid}`}
            onClick={() => {
                handleHideResult();
                localStorage.setItem("currentProfile", JSON.stringify(user));
                setCurrentProfile(user);
            }}
            className="flex items-center gap-2 min-w-full hover:bg-blue-700 dark:hover:bg-yellow-500 dark:hover:text-primary2 cursor-pointer hover:text-white  min-h-[70px]  py-1 px-2 border-t-[1px] border-b-[1px]"
        >
            <img src={user?.photoURL} className="min-w-[60px] h-[60px] rounded-[50%] object-cover" alt={user.name} />
            <div className="">
                <h2 className="text-[1.1rem] font-bold">
                    {user.name}
                    {user?.verified && (
                        <BsFillCheckCircleFill className="text-[16px] inline text-[#5890ff] dark:text-primary1 mb-[5px] ml-[6px]" />
                    )}
                </h2>
                <p className="line-clamp-2 text-[0.9rem] min-w-[236px]">{user.bio}</p>
            </div>
        </Link>
    );
}

export default ItemSearch;
