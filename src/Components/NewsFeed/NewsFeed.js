import React from "react";
import Post from "../Post/Post";

function NewsFeed({ scrollRef }) {
    return (
        <div className="dark:text-primary5  sm:w-[80%] w-[100%] mx-auto grid grid-cols-1 gap-y-12 ">
            <Post scrollRef={scrollRef.current} />
        </div>
    );
}

export default NewsFeed;
