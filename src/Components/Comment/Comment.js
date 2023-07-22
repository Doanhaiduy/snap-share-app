import React, { useContext, useState, useCallback } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ShowEmoji from "../ShowEmoji/ShowEmoji";
import { AuthContext } from "~/Context/AuthContextProvider";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "~/firebase/firebase-config";
import { format } from "date-fns";
import ListComment from "./ListComment";
import { v4 } from "uuid";
import { FaImage } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Gif from "../Gif/Gif";
import useCreateImage from "~/hooks/useCreateImage";
import useNotifications from "~/hooks/useNotifications";

function Comment({ post }) {
    const [comment, setComment] = useState("");
    const { currentUser, userInfo } = useContext(AuthContext);
    // const [imageComment, setImageComment] = useState(null);
    const [gifComment, setGifComment] = useState(null);
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const [image, handleCreateImage, setImage] = useCreateImage();
    const { addNotification } = useNotifications();

    const handleSendComment = useCallback(async () => {
        if (comment.trim() === "" && image === null && gifComment === null) {
            return;
        } else {
            const idInit = v4();
            await setComment("");
            const userRef = doc(db, "comments", currentUser?.uid + "comment" + idInit);
            await setDoc(userRef, {
                uid: currentUser?.uid + "comment" + idInit,
                releaseDate: currentDate,
                uidUser: currentUser?.uid,
                text: comment,
                uidPost: post.uid,
                img: image,
                gif: gifComment,
            });
            if (currentUser?.uid !== post.uidUser) {
                const newNotification = {
                    id: v4(),
                    uidTarget: currentUser?.uid,
                    type: "comment",
                    timestamp: new Date().getTime(),
                    content: comment,
                };
                await addNotification(post.uidUser, newNotification);
            }
            await setImage(null);
            await setGifComment(null);
        }
    }, [post.uid, currentUser?.uid, setImage, comment, currentDate, image, gifComment]);

    // const handlePostImage = async (e) => {
    //     if (e.target.files[0]) {
    //         const storageRef = ref(storage, `/Comments/${currentUser.displayName}/${e.target.files[0].name}${v4()}`);
    //         const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    //         uploadTask.on(
    //             "state_changed",
    //             (snapshot) => {},
    //             (err) => console.log(err),
    //             () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                     console.log(url);
    //                     setImageComment(url);
    //                 });
    //             }
    //         );
    //     } else {
    //     }
    // };

    const convertUrlToFile = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], "SnapShare.gif", { type: "image/gif" });
            return file;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const handlePostGif = async (id) => {
        convertUrlToFile(id)
            .then((file) => {
                if (file) {
                    const storageRef = ref(storage, `/Comments/${currentUser.displayName}/Gif/${v4()}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {},
                        (err) => console.log(err),
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                console.log(url);
                                setGifComment(url);
                            });
                        }
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendComment();
        }
    };
    return (
        <div>
            <div className="flex items-center gap-3 relative">
                <img src={userInfo?.photoURL} className="w-[50px] h-[50px] object-cover rounded-[50%]" alt="" />
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="text-[1.6rem] w-[80%] dark:bg-[#282828] rounded-[20px] outline-none border-[2px] px-3 py-1"
                />
                {image && <img src={image} className="w-[120px] object-cover h-[70px]" alt="" />}
                {gifComment && <img src={gifComment} className="w-[120px] object-cover h-[70px]" alt="" />}

                <div className="cursor-pointer">
                    <AiOutlineSend className="text-[2.4rem]" onClick={handleSendComment} />
                </div>
                <input type="file" className="hidden" id="image" onChange={(e) => handleCreateImage(e, "comments")} />
                <label htmlFor="image">
                    <FaImage className="text-[2.4rem] cursor-pointer" />
                </label>

                <ShowEmoji setText={setComment} className="" />
                <Gif handlePostGif={handlePostGif} />
            </div>
            <ListComment post={post} />
        </div>
    );
}

export default Comment;
