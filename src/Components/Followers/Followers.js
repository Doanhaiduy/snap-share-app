import React from "react";
import Follower from "./Follower";

function Followers(props) {
    return (
        <div className="grid md:grid-cols-3 gap-4  mt-5 grid-cols-1">
            <Follower />
            <Follower />
            <Follower />
            <Follower />
            <Follower />
        </div>
    );
}

export default Followers;
