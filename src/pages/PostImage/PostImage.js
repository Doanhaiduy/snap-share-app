import { Spin } from "antd";
import React, { useContext, useState } from "react";
import { FaArrowAltCircleLeft, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as id } from "uuid";
import { db, storage } from "../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { format } from "date-fns";
import ShowEmoji from "../../Components/ShowEmoji/ShowEmoji";
import { ToastContainer, toast } from "react-toastify";

function PostImage() {
    const { userInfo, currentUser } = useContext(AuthContext);
    const [imagePost, setImagePost] = useState(null);
    const [text, setText] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingHandlePost, setLoadingHandlePost] = useState(false);
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    const HandleShowImagePost = (e) => {
        console.log(e.target.files[0]);
        setLoadingImage(true);
        if (e.target.files[0]) {
            const storageRef = ref(storage, `/Post/${currentUser.displayName}/${e.target.files[0].name}${id()}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        setImagePost(url);
                        setLoadingImage(false);
                    });
                }
            );
        } else {
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        setLoadingHandlePost(true);
        const idInit = id();
        const userRef = doc(db, "posts", currentUser.uid + "post" + idInit);
        await setDoc(userRef, {
            uid: currentUser.uid + "post" + idInit,
            releaseDate: currentDate,
            uidUser: currentUser.uid,
            imagePost,
            public: isPublic,
            text,
            like: [],
            comment: [],
        });
        toast.success("Post successfully", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setText("");
        setImagePost(null);
        setIsPublic(true);
        setLoadingHandlePost(false);
    };
    return (
        <div className="p-6 h-[100vh] bg-gray-700">
            <ToastContainer />
            <div className="flex justify-between">
                <Link
                    to="/"
                    className="text-[1.5rem] inline-flex items-center gap-3 py-3 px-4 bg-blue-600 rounded-[12px] text-white cursor-pointer hover:opacity-90"
                >
                    <FaArrowAltCircleLeft />
                    Home
                </Link>
                <h2 className="inline-flex items-center gap-3 text-[2.2rem] font-semibold cursor-pointer text-white">
                    Post Image
                </h2>
                <h2
                    onClick={handleSubmitPost}
                    className="text-[1.5rem] inline-flex items-center gap-3 py-3 px-4 bg-blue-600 rounded-[12px] text-white cursor-pointer hover:opacity-90"
                >
                    Post
                </h2>
            </div>
            <div className="">
                <div className="w-full h-[750px] bg-slate-300 mt-12 rounded-[12px] p-8 ">
                    <h3 className="text-center text-[1.8rem] font-bold py-[12px]">Create Post</h3>
                    {loadingHandlePost ? (
                        <Spin size="large" />
                    ) : (
                        <div className="flex gap-12">
                            <div className=" gap-4 w-[50%] flex-1 flex flex-col p-4 relative">
                                <div className="flex items-center gap-4 ">
                                    <img
                                        src={userInfo.photoURL}
                                        className="w-[80px] h-[80px] object-cover rounded-[50%] "
                                        alt=""
                                    />
                                    <label htmlFor="addImage" className="">
                                        <FaImage className="w-[80px] h-[80px] cursor-pointer text-gray-600" />
                                    </label>
                                    <input
                                        type="file"
                                        id="addImage"
                                        className=" hidden"
                                        onChange={HandleShowImagePost}
                                    />
                                    <select
                                        onChange={(e) => setIsPublic(JSON.parse(e.target.value))}
                                        defaultValue="true"
                                        id="countries"
                                        className="bg-gray-50 border  border-gray-300 text-gray-900 text-[1.6rem] rounded-lg block w-full p-2.5"
                                    >
                                        <option value="true">Public</option>
                                        <option value="false">Private</option>
                                    </select>
                                </div>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className=" flex-1 bg-white w-full rounded-[12px] mt-[12px] outline-none p-4 text-[1.8rem] h-[400px]"
                                    name=""
                                    id=""
                                    placeholder="Write something for picture..."
                                ></textarea>
                                {/* <div onClick={handleEmojiPickerToggle} className="absolute bottom-[40px] right-[40px]">
                                    <div className="flex items-center gap-2 text-[1.2rem] font-semibold border-[4px] p-2 rounded-[12px] cursor-pointer text-gray-700">
                                        More icon <FaSmile className="text-[2rem]" />
                                    </div>
                                </div>
                                {showEmojiPicker && (
                                    <div className="absolute bottom-[80px] right-[60px]">
                                        <EmojiPicker height={300} onEmojiClick={handleEmojiClick} />
                                    </div>
                                )} */}
                                <ShowEmoji setText={setText} className={"absolute bottom-[40px] right-[40px]"} />
                            </div>
                            <div className="w-[50%] h-[600px] p-4 rounded-[12px] flex justify-center items-center">
                                {loadingImage ? (
                                    <Spin size="large" />
                                ) : (
                                    imagePost && (
                                        <img
                                            src={imagePost}
                                            className="w-full h-full rounded-[12px] object-cover"
                                            alt=""
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostImage;
