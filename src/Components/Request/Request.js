import React from "react";
import RequestItem from "./RequestItem";

function Request({ isMobile }) {
    return (
        <div className={`${!isMobile && "lg:block hidden"}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold uppercase text-gray-500 ">Request</h3>
                <span className="flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-full text-white">
                    <span className="text-sm">2</span>
                </span>
            </div>
            <div className=" flex flex-col gap-3 ">
                <RequestItem />
                <RequestItem />
            </div>
        </div>
    );
}

export default Request;
