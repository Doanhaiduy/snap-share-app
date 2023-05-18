import React, { useCallback, useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import PostItem from "./PostItem";
import { AiFillPushpin } from "react-icons/ai";

function Post() {
    const { getUserPost, userPosts } = useContext(AuthContext);
    const getUserPostCallback = useCallback(getUserPost, []);

    useEffect(() => {
        getUserPostCallback();
    }, [getUserPostCallback]);

    return (
        <>
            <div className="">
                <h2 className="text-[20px] font-medium flex items-center gap-2 mb-4">
                    <AiFillPushpin className="inline" /> Pinned Posts
                </h2>
                {userPosts
                    .filter(
                        (post) => post.uid === "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2postdc3a2629-fd1a-4eca-a26a-add624215fa0"
                    )
                    .map((post) => (
                        <PostItem post={post} key={post.uid} />
                    ))}
            </div>

            <h2 className="text-[20px] font-medium flex items-center gap-2 mb-[-14px]">Other Posts</h2>

            {userPosts.map((post) => (
                <PostItem post={post} key={post.uid} />
            ))}
        </>
    );
}

export default Post;
