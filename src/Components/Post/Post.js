import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import PostItem from "./PostItem";
import { AiFillPushpin } from "react-icons/ai";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function Post({ scrollRef }) {
    const { getUserPost, userPosts, pinnedPosts, setPinPost } = useContext(AuthContext);
    const [visiblePosts, setVisiblePosts] = useState(2);
    const [limit, setLimit] = useState(30);
    const { t } = useContext(MultiLanguageContext);

    useEffect(() => {
        setPinPost(null);
    }, []);
    useEffect(() => {
        getUserPost(null, limit);
    }, [limit]);
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = scrollRef;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 2);
        }
    };

    useEffect(() => {
        scrollRef?.addEventListener("scroll", handleScroll);

        return () => scrollRef?.removeEventListener("scroll", handleScroll);
    }, [scrollRef]);

    return (
        <>
            <div className="mt-[12px] ">
                <h2 className="text-[20px] font-medium flex items-center gap-2 mb-4 ">
                    <AiFillPushpin className="inline" /> {t("post.pinned")}
                </h2>

                <div className="flex flex-col gap-[50px]">
                    {pinnedPosts?.map((post) => (
                        <PostItem post={post} key={post?.uid} />
                    ))}
                </div>
            </div>
            <h2 className="text-[20px] font-medium flex items-center gap-2 mb-[-14px]">{t("post.other")}</h2>
            {userPosts
                .filter((item) => item.isPinPost !== true)
                ?.slice(0, visiblePosts)
                ?.map((post) => (
                    <PostItem post={post} key={post?.uid} />
                ))}
        </>
    );
}

export default Post;
