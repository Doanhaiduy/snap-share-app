import React from "react";
import Follower from "../Followers/Follower";

function Following(props) {
    return (
        <div className="grid grid-cols-1 gap-4  mt-5">
            <Follower />
            <Follower />
            <Follower />
            <Follower />
            <Follower />
            <Follower />
        </div>
    );
}

export default Following;
