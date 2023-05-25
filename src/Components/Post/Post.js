import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import PostItem from "./PostItem";
import { AiFillPushpin } from "react-icons/ai";
import { Spin } from "antd";

function Post() {
    const { getUserPost, userPosts, pinnedPosts, setPinPost } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(5);
    const handleLoadMore = () => {
        if (limit >= 40) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLimit((prevLimit) => prevLimit + 5);
            setLoading(false);
        }, 1000);
    };
    useEffect(() => {
        setPinPost(null);
    }, []);
    useEffect(() => {
        getUserPost(null, limit);
    }, [limit]);

    return (
        <>
            <div className="">
                <h2 className="text-[20px] font-medium flex items-center gap-2 mb-4">
                    <AiFillPushpin className="inline" /> Pinned Posts
                </h2>

                <div className="flex flex-col gap-[50px]">
                    {pinnedPosts?.map((post) => (
                        <PostItem limit={limit} post={post} key={post?.uid} />
                    ))}
                </div>
            </div>

            <h2 className="text-[20px] font-medium flex items-center gap-2 mb-[-14px]">Other Posts</h2>

            {userPosts
                .filter((item) => item.isPinPost !== true)
                ?.map((post) => (
                    <PostItem post={post} key={post?.uid} />
                ))}
            {!loading && (
                <button
                    onClick={handleLoadMore}
                    className="flex justify-center my-12 items-center mx-auto rounded-[4px] font-medium text-[12px] bg-blue-300 text-blue-700 px-3 py-1 mt-6"
                >
                    load more.post..
                </button>
            )}
            {loading && (
                <button
                    disabled
                    className="flex justify-center my-12 items-center mx-auto rounded-[4px] font-medium text-[12px] bg-blue-200 text-blue-700 px-3 py-1 mt-6"
                >
                    <Spin />
                </button>
            )}
        </>
    );
}

export default Post;
