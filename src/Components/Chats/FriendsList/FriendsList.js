import React, { useContext } from "react";
import FriendItem from "../FriendItem/FriendItem";
import useUser from "~/hooks/useUser";
import { AuthContext } from "~/Context/AuthContextProvider";

const FriendsList = () => {
    const { currentUser } = useContext(AuthContext);
    const { user } = useUser(currentUser?.uid);
    const sortedListContact = user?.listContact?.sort((a, b) => {
        const timestampA = new Date(a.timestamp).getTime();
        const timestampB = new Date(b.timestamp).getTime();
        return timestampB - timestampA;
    });
    return (
        <div className="p-2 max-h-[calc(100%-124px)] overflow-y-scroll no-scrollbar">
            {sortedListContact?.map((item, index) => (
                <FriendItem data={item} key={index} />
            ))}
        </div>
    );
};

export default FriendsList;
