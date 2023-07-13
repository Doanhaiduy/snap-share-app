import React from "react";
import Source from "./Source";
import Info from "./Info";
import { ChevronLeft } from "@mui/icons-material";

const ChatDetails = ({ showDetail, setShowDetail }) => {
    return (
        <div
            className={` h-[calc(100vh-80px)] overflow-y-scroll no-scrollbar relative  ${
                showDetail ? "block col-span-4 sm:col-span-1" : "sm:block hidden"
            }`}
        >
            <div
                className="absolute top-[20px] left-[20px] sm:hidden block cursor-pointer"
                onClick={() => setShowDetail(false)}
            >
                <ChevronLeft />
            </div>
            <Info />
            <Source />
        </div>
    );
};

export default ChatDetails;
