import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { AiOutlineGlobal, AiTwotoneLock } from "react-icons/ai";

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
        <div className="grid grid-cols-4 gap-8">
            {userPosts.map((post) => (
                <div key={post.uid}>
                    {post.public ? <AiOutlineGlobal /> : <AiTwotoneLock />}
                    <p>{post.text}</p>
                    <img src={post.imagePost} height={200} alt="Ảnh" />
                </div>
            ))}
        </div>
    );
}

export default ListPost;
