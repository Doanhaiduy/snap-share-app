import React from "react";
import { FcCommandLine } from "react-icons/fc";

function Hobby() {
    return (
        <div className="flex gap-2 items-center px-2 py-1  rounded-[25px] border-2 hover:bg-slate-200 dark:hover:bg-gray-500 cursor-pointer border-slate-200">
            <FcCommandLine className="min-w-[18px]" /> Coding
        </div>
    );
}

export default Hobby;
