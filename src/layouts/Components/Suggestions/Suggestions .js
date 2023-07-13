import React, { useEffect, useState } from "react";
import Request from "./Request/Request";
import { AiOutlineAlignRight, AiOutlineClose } from "react-icons/ai";
import FriendActive from "./FriendActive/FriendActive";

function Suggestions() {
    const [showOption, setShowOption] = useState(false);
    useEffect(() => {
        function handleResize() {
            if (window.outerWidth >= 1024) {
                setShowOption(false);
            }
        }
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div
            className={`py-[80px] pr-4 ${
                showOption && "pr-0"
            } lg:relative top-[15px]  absolute lg:right-0 right-[20px] ${
                window.location.pathname !== "/" && "none"
            } flex  gap-4 flex-col h-[100vh] lg:overflow-y-auto overflow-visible no-scrollbar lg:w-full lg:ml-0 ml-auto`}
        >
            <div className="lg:hidden block text-black dark:text-white">
                {showOption ? (
                    <AiOutlineClose
                        onClick={() => {
                            setShowOption(!showOption);
                        }}
                        className="text-[2.5rem] absolute right-[16px] cursor-pointer p-2 rounded-[12px]"
                    />
                ) : (
                    <AiOutlineAlignRight
                        onClick={() => {
                            setShowOption(!showOption);
                        }}
                        className="text-[2.5rem] absolute right-0 dark:bg-[#282828] bg-white hover:bg-slate-100 cursor-pointer p-2 rounded-[12px]"
                    />
                )}
                <div
                    className={` ${
                        showOption && "w-[300px] bg-slate-100 dark:bg-[#222] p-3 pt-10 max-h-[90vh]"
                    }  rounded-[12px] flex flex-col gap-3  overflow-y-auto no-scrollbar`}
                >
                    {showOption && (
                        <>
                            <Request isMobile={true} />
                            <FriendActive isMobile={true} />
                        </>
                    )}
                </div>
            </div>
            <Request />
            <FriendActive />
        </div>
    );
}

export default Suggestions;
