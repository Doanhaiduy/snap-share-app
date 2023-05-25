import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import PostItemModal from "./PostItemModal";

function ListPost({ userRender }) {
    const { userPosts, getUserPost } = useContext(AuthContext);
    useEffect(() => {
        getUserPost(userRender.uid);
    }, [userRender.uid]);

    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3  sm:grid-cols-2 grid-cols-1 xl  gap-8 pb-12">
            {userPosts.map((post) => (
                <PostItemModal key={post.uid} post={post} />
            ))}
        </div>
    );
}

export default ListPost;
