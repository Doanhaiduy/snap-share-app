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
        if (text !== "" || imagePost !== null) {
            setLoadingHandlePost(true);
            const idInit = id();
            const userRef = doc(db, "posts", currentUser.uid + "post" + idInit);
            await setDoc(userRef, {
                uid: currentUser.uid + "post" + idInit,
                releaseDate: currentDate,
                uidUser: currentUser.uid,
                imagePost,
                public: isPublic,
                text: text.replace(/\n/g, "<br>"),
                like: [],
                comment: [],
            });
            toast.success("Image uploaded successfully!", {
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
        }
    };

    return (
        <div className="p-6 bg-gray-700 sm:h-auto h-[100vh]">
            <ToastContainer />
            <div className="flex justify-between items-center">
                <Link
                    to="/"
                    className="inline-flex gap-3 items-center justify-center px-4 py-4 hover:opacity-90 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg  h-[40px] sm:h-[60px]"
                >
                    <FaArrowAltCircleLeft />
                    Home
                </Link>
                <h2
                    onClick={handleSubmitPost}
                    className="inline-flex cursor-pointer items-center justify-center px-4 py-4 hover:opacity-90 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg  h-[40px] sm:h-[60px]"
                >
                    Post
                </h2>
            </div>
            <div className="">
                <div className="w-full sm:h-[750px] bg-slate-300 mt-12 rounded-[12px] p-8 ">
                    <h3 className="text-center text-[1.8rem] font-bold py-[12px]">Create Post</h3>
                    {loadingHandlePost ? (
                        <Spin size="large" />
                    ) : (
                        <div className="flex sm:gap-x-12 sm:flex-row flex-col">
                            <div className=" gap-4 sm:w-[50%] flex-1 flex flex-col p-4 relative">
                                <div className="flex items-center gap-4 ">
                                    <img
                                        src={userInfo.photoURL}
                                        className=" sm:w-[80px] sm:h-[80px] w-[40px] h-[40px] object-cover rounded-[50%] "
                                        alt=""
                                    />
                                    <label htmlFor="addImage" className="">
                                        <FaImage className=" sm:w-[80px] sm:h-[80px] w-[40px] h-[40px] cursor-pointer text-gray-600" />
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
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-[1.6rem] text-[1rem] rounded-lg block w-full p-1 sm:p-2.5"
                                    >
                                        <option value="true">Public</option>
                                        <option value="false">Private</option>
                                    </select>
                                </div>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className=" flex-1 bg-white w-full rounded-[12px] mt-[12px] outline-none p-4 text-[1rem] sm:text-[1.8rem] sm:h-[400px]"
                                    name=""
                                    id=""
                                    placeholder="Write something for picture..."
                                ></textarea>

                                <ShowEmoji setText={setText} className={"absolute bottom-[40px] right-[40px]"} />
                            </div>
                            <div className="sm:w-[50%] sm:h-[600px] h-[100%] p-4 rounded-[12px] flex justify-center items-center">
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
