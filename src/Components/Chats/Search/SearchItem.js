import React from "react";

const SearchItem = ({ user, handleSelect, handleHideResult }) => {
    return (
        <div
            className="flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-[#555] cursor-pointer p-2  max-w-[full] border-y-[1px]"
            onClick={() => {
                handleSelect(user);
                handleHideResult();
            }}
        >
            <div className="">
                <img className="w-[40px] h-[40px] rounded-full object-cover" src={user?.photoURL} alt="" />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold line-clamp-1">{user?.name}</h3>
                <span>{user?.nameId}</span>
            </div>
        </div>
    );
};

export default SearchItem;
