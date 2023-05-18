import React, { useState } from "react";
import { AiOutlineGlobal, AiTwotoneLock } from "react-icons/ai";
import PostItem from "../Post/PostItem";

function PostItemProfile({ post }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <div className="">
                    <div
                        className="fixed left-0 top-[0] right-0 bottom-0 bg-black/80 z-10"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    ></div>
                    <div className="fixed z-[200] w-[50vw] top-[100px] overflow-y-scroll overscroll-contain h-[80vh] left-[50%] translate-x-[-50%]  bg-white rounded-[12px] overflow-hidden">
                        <span
                            className="absolute z-10 right-[50px] top-[8px]  text-[2rem] cursor-pointer"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            &times;
                        </span>
                        <PostItem post={post} />
                    </div>
                </div>
            )}
            <div
                key={post.uid}
                className="h-[400px] border-[2px] p-2 flex flex-col  justify-between w-full relative rounded-[12px]"
            >
                <div className="flex flex-1 gap-3">
                    <p
                        className=" mb-3 flex items-center text-[1.4rem] w-[60%] line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: post.text }}
                    ></p>
                    <span className="text-[0.8rem] font-semibold ">{post.releaseDate}</span>
                </div>
                <p className="absolute top-[12px] right-[12px] text-[2rem] cursor-pointer ">
                    {post.public ? <AiOutlineGlobal /> : <AiTwotoneLock />}
                </p>
                <div className="h-[70%] " onClick={() => setShowModal(true)}>
                    <img
                        className="object-cover h-full w-full  cursor-pointer"
                        src={post.imagePost}
                        height={200}
                        alt="Ảnh"
                    />
                </div>
            </div>
        </>
    );
}

export default PostItemProfile;
