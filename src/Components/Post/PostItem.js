import React, { memo, useContext, useEffect, useState, useRef, useCallback } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { AuthContext } from "../../Context/AuthContextProvider";
import ModalPost from "../ModalPost/ModalPost";
import { ProfileContext } from "../../Context/ProfileContextProvider";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import { ToastContainer, toast } from "react-toastify";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FacebookShareButton } from "react-share";
import moment from "moment";

function PostItem({ post, limit, isProfile = false }) {
    const [authorPost, setAuthorPost] = useState({});
    const { currentUser, getUserPost, setPinPost, unPinPost } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const { setCurrentProfile } = useContext(ProfileContext);
    const CommentMemoized = memo(Comment);
    const [shouldGetUserPosts, setShouldGetUserPosts] = useState(false);
    const [isLiked, setIsLiked] = useState(post?.like?.includes(currentUser?.uid));
    const [showComment, setShowComment] = useState(false);
    const optionRef = useRef();
    const optionsRef = useRef(null);
    useEffect(() => {
        getAuthorPost(post.uidUser);
    }, [post.uidUser]);
    const getAuthorPost = async (uid) => {
        const docRef = doc(db, "users", uid);
        const userDoc = await getDoc(docRef);
        setAuthorPost(userDoc.data());
    };

    const handleToggleModal = () => {
        setShowComment(false);
        setShowModal(!showModal);
    };
    useEffect(() => {
        if (shouldGetUserPosts) {
            if (isProfile) {
                getUserPost(post.uidUser);
            } else {
                getUserPost(null, limit);
            }
        }
    }, [shouldGetUserPosts]);
    const handleLikePost = useCallback(async () => {
        setShouldGetUserPosts(true);
        setShowComment(false);
        const userRef = doc(db, "posts", post.uid);
        const userSnapshot = await getDoc(userRef);
        const postData = userSnapshot.data();

        const updatedLikes = isLiked
            ? postData.like.filter((id) => id !== currentUser?.uid)
            : [...postData.like, currentUser?.uid];

        await setDoc(userRef, { like: updatedLikes }, { merge: true });
        if (isProfile) {
            await getUserPost(post.uidUser);
        } else {
            await getUserPost(null, limit);
        }
        setIsLiked(!isLiked);
    }, [isLiked, currentUser?.uid, post.uid, limit]);
    const handleRemovePost = async () => {
        await deleteDoc(doc(db, "posts", post.uid));
        await toast.success("Your post has been removed successfully!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        getUserPost(null, limit);
    };
    const handleToggleComment = () => {
        setShowComment(!showComment);
    };

    const handleSaveImage = async () => {
        // Logic
        // ...
        toast.success("Save successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const handleHackLike = async () => {
        const userRef = doc(db, "posts", post.uid);
        const userSnapshot = await getDoc(userRef);
        const postData = userSnapshot.data();
        const countRandom = Math.floor(Math.random() * (50 - 150) + 150);
        var array = Array(countRandom).fill(1);
        const updatedLikes = [...postData.like, ...array];
        await setDoc(userRef, { like: updatedLikes }, { merge: true });
        toast.success(`${countRandom} likes successfully contributed to your post`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    return (
        <div className="relative bg-white rounded-[12px] " ref={optionRef}>
            <ToastContainer />
            {showModal ? <ModalPost handleToggleModal={handleToggleModal} data={post} authorPost={authorPost} /> : null}
            <div className="p-4 shadow-2xl rounded-[12px] transition relative" key={post.uid}>
                <Link
                    to={`/profile/${authorPost?.uid}`}
                    className="inline-flex items-center gap-3"
                    onClick={() => {
                        localStorage.setItem("currentProfile", JSON.stringify(authorPost));
                        setCurrentProfile(authorPost);
                    }}
                >
                    <div className="w-[60px] h-[60px] ">
                        <img src={authorPost?.photoURL} alt="" className="w-full h-full object-cover rounded-[50%]" />
                    </div>
                    <div className="">
                        <h2 className="text-[1.3rem] font-bold">
                            {authorPost?.name}
                            {authorPost.verified && (
                                <BsFillCheckCircleFill className="text-[16px] inline text-[#5890ff]  ml-[6px]" />
                            )}
                        </h2>
                        <p>
                            {moment().diff(post.releaseDate, "days") > 3
                                ? post.releaseDate
                                : moment(post.releaseDate).fromNow()}
                        </p>
                    </div>
                </Link>

                <p dangerouslySetInnerHTML={{ __html: post.text }}></p>
                <div>
                    <span className="absolute top-[0px] text-[2rem] right-[20px] cursor-pointer select-none group">
                        ...
                        <div
                            ref={optionsRef}
                            className="absolute top-[30px] text-[1.1rem] flex flex-col bg-white font-medium right-[20px] shadow-lg  rounded-[8px] w-[160px] overflow-hidden z-10 group-hover:flex hidden"
                        >
                            {currentUser?.uid === "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2" ? (
                                !post.isPinPost ? (
                                    <p
                                        className="py-1 px-4 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer "
                                        onClick={() => setPinPost(post?.uid)}
                                    >
                                        Pin Post
                                    </p>
                                ) : (
                                    <p
                                        className="py-1 px-4 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer "
                                        onClick={() => unPinPost(post?.uid)}
                                    >
                                        Unpin Post
                                    </p>
                                )
                            ) : null}

                            {post.uidUser === currentUser?.uid ||
                            currentUser?.uid === "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2" ? (
                                <p
                                    className="py-1 px-4 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer "
                                    onClick={handleRemovePost}
                                >
                                    Remove image
                                </p>
                            ) : null}
                            {currentUser?.uid === "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2" && (
                                <p
                                    className="py-1 px-4 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer "
                                    onClick={handleHackLike}
                                >
                                    + Random Like
                                </p>
                            )}
                            <p
                                className="py-1 px-4 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer "
                                onClick={handleSaveImage}
                            >
                                Save image
                            </p>
                            <p className="py-1 px-4 hover:bg-slate-500 hover:text-white transition-colors cursor-pointer ">
                                Report image
                            </p>
                        </div>
                    </span>
                </div>
                <div className="w-full">
                    <img
                        src={post.imagePost}
                        alt=""
                        className="mt-4 rounded-[12px] w-full object-cover cursor-pointer max-h-[500px]"
                        onClick={handleToggleModal}
                    />
                </div>
                <div className="py-4 flex gap-2 items-center text-[1.5rem] ">
                    <AiOutlineHeart className="text-[2rem] cursor-pointer" />
                    <span className="text-gray-400 font-thin">{post.like.length}</span>
                    <span className="text-[1rem]">
                        {post.like.length > 0 ? (
                            <span>
                                {isLiked ? <span>Bạn </span> : null}
                                {post.like.length > 1 ? (
                                    <span>
                                        {isLiked ? `và ${post.like.length - 1} ` : `${post.like.length} `}
                                        người khác{" "}
                                    </span>
                                ) : isLiked ? (
                                    <span></span>
                                ) : (
                                    <span>1 người khác </span>
                                )}
                                đã thích bài viết này
                            </span>
                        ) : null}
                    </span>
                </div>
                <div className="py-4 flex justify-between sm:px-4 border-t-2">
                    <div className="cursor-pointer flex gap-2 items-center font-semibold" onClick={handleLikePost}>
                        {isLiked ? (
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
                        <span></span>
                        <span>Comment</span>
                    </div>
                    <div className="cursor-pointer  items-center font-semibold">
                        <FacebookShareButton
                            url={post.imagePost}
                            quote={post.text}
                            hashtag="#SnapShare"
                            className="flex items-center gap-2"
                        >
                            <AiOutlineShareAlt className="text-[2rem]" />
                            <span>Share</span>
                        </FacebookShareButton>
                    </div>
                </div>
                {showComment ? <CommentMemoized authorPost={authorPost} post={post} /> : null}
            </div>
        </div>
    );
}
export default PostItem;
