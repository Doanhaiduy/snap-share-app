import React from "react";

function ModalPost({ data, handleToggleModal, authorPost }) {
    return (
        <div className="fixed top-[10%] left-[50%] z-[100]">
            <div
                className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 "
                onClick={handleToggleModal}
            ></div>
            <div className="absolute h-[90vh] w-[70vw] top-[-20px]  left-[50%] translate-x-[-50%] bg-slate-200 dark:bg-[#282828]  rounded-[12px] overflow-hidden">
                <span className="absolute top-0 right-[20px] text-[3rem] cursor-pointer" onClick={handleToggleModal}>
                    &times;
                </span>
                <img className="w-full h-full object-contain max-h-[700px]" src={data?.imagePost} alt="" />
                {/* <div className="p-5 flex justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={authorPost?.photoURL}
                            className="w-[full] h-[full] rounded-[50%] object-cover"
                            alt=""
                        />
                        <h2 className="font-bold text-[1.4rem]">{authorPost?.name}</h2>
                    </div>
                    <Link to={data?.imagePost} target="_blank" className="">
                        <AiOutlineDownload className="text-[3rem] cursor-pointer" />
                    </Link>
                </div> */}
            </div>
        </div>
    );
}

export default ModalPost;
