import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function Follower(props) {
    return (
        <div className="flex items-center cursor-pointer gap-2 dark:bg-[#333] bg-white p-2 relative rounded-[12px]">
            <div className="flex items-center gap-2 ">
                <div className=" ">
                    <img
                        className="h-[50px]  w-[50px] rounded-[12px]"
                        src="https://source.unsplash.com/random"
                        alt=""
                    />
                </div>
                <div className="">
                    <h2 className="font-semibold ">Doan Hai Duy</h2>
                    <h2 className="font-normal text-[12px] ">@doanhaiduy</h2>
                </div>
            </div>
            <div className="absolute top-[6px] text-[20px] right-[6px] group">
                <BiDotsHorizontalRounded />
                <ul className="absolute top-[12px] group-hover:block w-[90px]  hover:block hidden right-[12px] rounded-[6px] overflow-hidden text-[14px]  bg-white dark:bg-[#222]  font-semibold ">
                    <li className="hover:bg-slate-500 px-2 py-1 hover:text-white">Delete</li>
                    <li className="hover:bg-slate-500 px-2 py-1 hover:text-white">Chat</li>
                </ul>
            </div>
        </div>
    );
}

export default Follower;
