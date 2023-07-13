import React, { useState } from "react";
import { AiOutlineGlobal, AiTwotoneLock } from "react-icons/ai";
import PostItem from "../Post/PostItem";
import moment from "moment";

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
                    <div className="fixed z-[200] md:w-[50vw] top-[100px] overflow-y-scroll overscroll-contain h-[80vh] left-[50%] translate-x-[-50%]  bg-white rounded-[12px] overflow-hidden">
                        <span
                            className="absolute z-10 right-[50px] top-[8px]  text-[2rem] cursor-pointer"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            &times;
                        </span>
                        <PostItem post={post} isProfile />
                    </div>
                </div>
            )}

            <div
                key={post.uid}
                className="h-[400px] bg-white shadow-2xl border-[#ccc]  dark:border-[#aaa] border-[2px] p-3 flex flex-col dark:bg-[#282828]  justify-between w-full relative rounded-[12px] overflow-hidden"
            >
                <div className="h-[130px]">
                    <p className=" text-[2rem] cursor-pointer flex justify-between">
                        <span className="text-[0.8rem] font-semibold ">
                            {moment().diff(post.releaseDate, "days") > 30
                                ? post.releaseDate
                                : moment(post.releaseDate).fromNow()}
                        </span>
                        {post.public ? <AiOutlineGlobal /> : <AiTwotoneLock />}
                    </p>
                    <div className="flex flex-1 gap-3">
                        <p
                            className=" mb-3 flex items-center text-[1.4rem] h-[90px]  line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: post.text }}
                        ></p>
                    </div>
                </div>
                <div className="flex-1" onClick={() => setShowModal(true)}>
                    {post.imagePost ? (
                        <img
                            className="object-cover h-full w-full cursor-pointer z-10 rounded-[12px]"
                            src={post.imagePost}
                            height={200}
                            alt="Ảnh"
                        />
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default PostItemProfile;
