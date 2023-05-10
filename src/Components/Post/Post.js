import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import PostItem from "./PostItem";
import ModalPost from "../ModalPost/ModalPost";
function Post() {
    const { getUserPost, userPosts } = useContext(AuthContext);
    const getUserPostCallback = useCallback(getUserPost, []);

    useEffect(() => {
        getUserPostCallback();
    }, [getUserPostCallback]);
    const sortedPosts = userPosts.sort((a, b) => {
        const dateA = new Date(a.releaseDate);
        const dateB = new Date(b.releaseDate);
        return dateB - dateA;
    });
    console.log("render");
    return (
        <div className="relative">
            
            {sortedPosts.map((post) => (
                <PostItem post={post} key={post.uid} />
            ))}
        </div>
    );
}

export default Post;
