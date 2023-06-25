import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import PostItemModal from "./PostItemModal";

function ListPost({ userRender }) {
    const { userPosts, getUserPost } = useContext(AuthContext);
    useEffect(() => {
        if (userRender.uid !== null) {
            getUserPost(userRender.uid);
        }
    }, [userRender.uid]);

    return (
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 pb-12 mt-5">
            {userPosts.length === 0 && (
                <p className="text-[20px] font-semibold col-span-2">The user has not posted any posts yet</p>
            )}
            {userPosts.map((post) => (
                <PostItemModal key={post.uid} post={post} />
            ))}
        </div>
    );
}

export default ListPost;
