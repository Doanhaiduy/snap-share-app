import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import Comment from "../Comment/Comment";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { AuthContext } from "../../Context/AuthContextProvider";
import ModalPost from "../ModalPost/ModalPost";
import { ProfileContext } from "../../Context/ProfileContextProvider";
import { Link } from "react-router-dom";

function PostItem({ post }) {
    const [authorPost, setAuthorPost] = useState({});
    const { currentUser } = useContext(AuthContext);
    const [isLike, setIsLike] = useState(!!post.like.includes(currentUser?.uid));
    const [likeCount, setLikeCount] = useState(post.like);
    const { getUserPost } = useContext(AuthContext);
    const [namePeopleLiked, setNamePeopleLiked] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { currentProfile, setCurrentProfile } = useContext(ProfileContext);

    useEffect(() => {
        getUserPost();
    }, [isLike]);

    const getAuthorPost = async (uid) => {
        const docRef = doc(db, "users", uid);
        const userDoc = await getDoc(docRef);
        setAuthorPost(userDoc.data());
    };

    const handleToggleLike = () => {
        setIsLike(!isLike);
    };
    const handleToggleModal = () => {
        setShowModal(!showModal);
    };
    useEffect(() => {
        getAuthorPost(post.uidUser);
    }, []);
    const [showComment, setShowComment] = useState(false);
    const handleToggleComment = () => {
        setShowComment(!showComment);
    };
    const handleLikePost = async () => {
        console.log(namePeopleLiked);
        if (!isLike) {
            const userRef = doc(db, "posts", post.uid);
            await setLikeCount((prev) => [...prev, currentUser?.uid]);
            await setDoc(
                userRef,
                {
                    like: [...likeCount, currentUser?.uid],
                },
                { merge: true }
            );
            handleToggleLike();
        } else {
            const userRef = doc(db, "posts", post.uid);
            await setLikeCount((prev) => prev.filter((id) => id !== currentUser?.uid));
            await setDoc(
                userRef,
                {
                    like: likeCount.filter((id) => id !== currentUser?.uid),
                },
                { merge: true }
            );
            handleToggleLike();
        }
        console.log(post.like.length);
    };

    return (
        <div className="relative">
            {showModal ? <ModalPost handleToggleModal={handleToggleModal} data={post} authorPost={authorPost} /> : null}
            <div className="p-4 shadow-2xl rounded-[12px] " key={post.uid}>
                <div className="flex items-center gap-3">
                    <Link className="w-[60px] h-[60px] " to={`/profile/${authorPost?.uid}`}>
                        <img
                            src={authorPost?.photoURL}
                            alt=""
                            className="w-full h-full object-cover rounded-[50%]"
                            onClick={() => {
                                localStorage.setItem("currentProfile", JSON.stringify(authorPost));
                                setCurrentProfile(authorPost);
                            }}
                        />
                    </Link>
                    <div className="">
                        <h2 className="text-[1.3rem] font-bold">{authorPost?.name}</h2>
                        <p>{post.releaseDate}</p>
                    </div>
                </div>
                <p>{post.text}</p>
                <div className="w-full">
                    <img
                        src={post.imagePost}
                        alt=""
                        className="mt-4 rounded-[12px] w-full object-cover cursor-pointer"
                        onClick={handleToggleModal}
                    />
                </div>
                <div className="py-4 flex gap-2 items-center text-[1.5rem] ">
                    <AiOutlineHeart className="text-[2rem] cursor-pointer" />
                    <span className="text-gray-400 font-thin">{post.like.length}</span>
                    <span className="text-[1rem]">
                        {post.like.length > 0 ? (
                            <span>
                                {isLike ? <span>Bạn </span> : null}
                                {post.like.length > 1 ? (
                                    <span>
                                        {isLike ? `và ${post.like.length - 1} ` : `${post.like.length} `}
                                        người khác{" "}
                                    </span>
                                ) : isLike ? (
                                    <span></span>
                                ) : (
                                    <span>1 người khác </span>
                                )}
                                đã thích bài viết này
                            </span>
                        ) : null}
                    </span>
                </div>
                <div className="py-4 flex justify-between px-12 border-t-2">
                    <div className="cursor-pointer flex gap-2 items-center font-semibold" onClick={handleLikePost}>
                        {isLike ? (
                            <AiFillHeart className="text-[2rem] text-red-600" />
                        ) : (
                            <AiOutlineHeart className="text-[2rem]" />
                        )}

                        <span>Like</span>
                    </div>
                    <div
                        className="cursor-pointer flex gap-2 items-center font-semibold "
                        onClick={handleToggleComment}
                    >
                        <AiOutlineComment className="text-[2rem]" />
                        <span>Comment</span>
                    </div>
                    <div className="cursor-pointer flex gap-2 items-center font-semibold">
                        <AiOutlineShareAlt className="text-[2rem]" />
                        <span>Share</span>
                    </div>
                </div>
                {showComment ? <Comment authorPost={authorPost} /> : null}
            </div>
        </div>
    );
}

export default PostItem;
