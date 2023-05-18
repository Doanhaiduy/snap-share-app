import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { AiOutlineGlobal, AiTwotoneLock } from "react-icons/ai";
import PostItemModal from "./PostItemModal";

function ListPost({ userRender }) {
    const { userPosts, getUserPost, currentUser } = useContext(AuthContext);
    useEffect(() => {
        if (userRender.uid !== currentUser.uid) {
            getUserPost(userRender.uid);
        } else {
            getUserPost(currentUser.uid);
        }
    }, []);
    return (
        <div className="grid grid-cols-4 gap-8 pb-12">
            {userPosts.map((post) => (
                <PostItemModal key={post.uid} post={post} />
            ))}
        </div>
    );
}

export default ListPost;
