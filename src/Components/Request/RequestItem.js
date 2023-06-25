import React from "react";

function RequestItem() {
    return (
        <div className=" bg-white dark:bg-[#282828] dark:text-primary5 h-auto p-5 flex flex-col items-center gap-4 rounded-[12px] ">
            <div className="flex items-center gap-4">
                <img className="w-[45px] h-[45px] rounded-[12px]" src="https://source.unsplash.com/random" alt="" />
                <p className="line-clamp-2">
                    <strong>Doan Hai Duy</strong> wants to add you to friends
                </p>
            </div>
            <div className="flex items-center gap-x-5" aria-label="button-combination">
                <button className="inline-flex items-center justify-center px-4 text-[0.8rem] xl:text-[1rem] xl:px-6 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-lg h-[40px]">
                    Accept
                </button>
                <button className="inline-flex items-center justify-center px-4 text-[0.8rem] xl:text-[1rem] xl:px-6 py-4 font-sans font-semibold tracking-wide text-blue-500 dark:text-primary1 dark:border-primary1 border border-blue-500 rounded-lg h-[40px]">
                    Decline
                </button>
            </div>
        </div>
    );
}

export default RequestItem;
