import React from "react";
import Post from "../Post/Post";

function NewsFeed(props) {
    return (
        <div className="mt-12 w-[60%] mx-auto grid grid-cols-1 gap-y-12 ">
            <Post />
        </div>
    );
}

export default NewsFeed;
