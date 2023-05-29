import React from "react";
import Post from "../Post/Post";

function NewsFeed(props) {
    return (
        <div className="sm:w-[60%] w-[90%] mx-auto grid grid-cols-1 gap-y-12 ">
            <Post />
        </div>
    );
}

export default NewsFeed;
