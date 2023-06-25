import React from "react";
import Friend from "./Friend";

function Friends(props) {
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-5">
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
            <Friend />
        </div>
    );
}

export default Friends;
