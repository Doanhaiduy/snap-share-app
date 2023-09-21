import React, { useContext, useEffect } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import PostItemModal from "./PostItemModal";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import PostItem from "../Post/PostItem";

function ListPost({ userRender }) {
    const { userPosts, getUserPost } = useContext(AuthContext);
    const { t } = useContext(MultiLanguageContext);

    useEffect(() => {
        if (userRender.uid !== null) {
            getUserPost(userRender.uid);
        }
    }, [userRender.uid]);

    return (
        <div className="grid grid-cols-1 gap-4 pb-12 mt-5 ">
            {userPosts.length === 0 && <p className="text-[20px] font-semibold col-span-2">{t("noOnePost")}</p>}
            {userPosts.map((post) => (
                <PostItem key={post.uid} isProfile={true} post={post} />
            ))}
        </div>
    );
}

export default ListPost;
