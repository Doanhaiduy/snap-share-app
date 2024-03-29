// import FbImageLibrary from "react-fb-image-grid";
import { Spin } from "antd";
import React, { useContext, useState } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as id } from "uuid";
import { db, storage } from "~/firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { format } from "date-fns";
import ShowEmoji from "~/Components/ShowEmoji/ShowEmoji";
import { toast } from "react-toastify";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { ThemeContext } from "~/Context/ThemeContextProvider";
import useCreateImage from "~/hooks/useCreateImage";
import ShowImage from "../ShowImage/ShowImage";

function CreatePost2({ handleCloseModal }) {
    const { userInfo, currentUser } = useContext(AuthContext);
    const { t } = useContext(MultiLanguageContext);

    const [text, setText] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [loadingImage, setLoadingImage] = useState(false);
    const [loadingHandlePost, setLoadingHandlePost] = useState(false);
    const { darkToggle } = useContext(ThemeContext);
    const [image, handleCreateImage, setImage, images, setImages] = useCreateImage();

    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (text.trim() !== "" || images) {
            setLoadingHandlePost(true);
            const idInit = id();
            const userRef = doc(db, "posts", currentUser.uid + "post" + idInit);
            await setDoc(userRef, {
                uid: currentUser.uid + "post" + idInit,
                releaseDate: currentDate,
                uidUser: currentUser.uid,
                imagePost: [...images],
                public: isPublic,
                text: text.replace(/\n/g, "<br>"),
                like: [],
                comment: [],
            });
            toast.success(t("createPost.toast-1"), {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: darkToggle ? "dark" : "light",
            });
            setText("");
            setImage(null);
            setImages([]);
            setIsPublic(true);
            setLoadingHandlePost(false);
            handleCloseModal();
        } else {
            toast.error(t("createPost.toast-2"), {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: darkToggle ? "dark" : "light",
            });
        }
    };

    return (
        <div className="relative z-[51]">
            <div
                className="fixed top-0 left-0 right-0 bottom-0 dark:bg-black bg-slate-600 opacity-70"
                onClick={() => handleCloseModal()}
            ></div>
            <div className="dark:text-white px-8 text-primary2 w-[80%] h-[60%] top-[10%] dark:bg-[#282828] bg-slate-100 fixed  left-0 right-0 overflow-y-auto no-scrollbar p-6 pb-12 mx-auto  rounded-md shadow-md">
                {/* <span
                    className="absolute top-[20px] right-[20px] text-[2.4rem] cursor-pointer"
                    onClick={() => handleCloseModal()}
                >
                    <AiOutlineCloseCircle />
                </span> */}
                <h2
                    onClick={handleSubmitPost}
                    className="inline-flex top-[12px] right-[12px] absolute  cursor-pointer items-center justify-center px-8 py-2 hover:opacity-90 font-sans font-semibold tracking-wide text-white bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-lg  h-[40px] lg:h-[50px]"
                >
                    {t("createPost.submit")}
                </h2>
                <h3 className="text-center text-[1.8rem] font-bold py-[12px] text-primary2 dark:text-primary4">
                    {t("createPost.title")}
                </h3>
                {loadingHandlePost ? (
                    <Spin size="large" />
                ) : (
                    <div className="flex lg:gap-x-2 lg:flex-row flex-col">
                        <div className=" gap-4 lg:w-[50%] flex-1 flex flex-col p-4 relative">
                            <div className="flex items-center gap-4 ">
                                <img
                                    src={userInfo?.photoURL}
                                    className=" lg:w-[80px] lg:h-[80px] w-[40px] h-[40px] object-cover rounded-[50%] "
                                    alt=""
                                />

                                <select
                                    onChange={(e) => setIsPublic(JSON.parse(e.target.value))}
                                    defaultValue="true"
                                    id="countries"
                                    className="block  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                >
                                    <option value="true">{t("createPost.public")}</option>
                                    <option value="false">{t("createPost.private")}</option>
                                </select>
                            </div>
                            <textarea
                                placeholder="what's on your mind?"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                id="textarea"
                                type="textarea"
                                rows={6}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />

                            <ShowEmoji
                                setText={setText}
                                className={"absolute top-[200px] lg:top-[230px] right-[20px]"}
                            />
                        </div>

                        <div className="lg:w-[40%] w-full p-4 lg:mt-[100px]">
                            <div className="mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ">
                                <ShowImage imgs={images} />
                                <div className="space-y-1 text-center ">
                                    {images ? null : (
                                        <svg
                                            className="mx-auto h-12 w-12 dark:text-white text-primary2"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                    <div className="flex flex-col gap-4 text-sm text-gray-600 items-center justify-center ">
                                        <label
                                            htmlFor="file-avatar"
                                            className="relative cursor-pointer bg-slate-200 p-1 my-2 rounded-md font-medium text-indigo-600 dark:text-primary1 dark:bg-[#666] hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span> {loadingImage ? <Spin /> : "Upload a file"}</span>
                                            <input
                                                id="file-avatar"
                                                name="file-avatar"
                                                multiple
                                                type="file"
                                                className="sr-only"
                                                onChange={async (e) => {
                                                    await setImages([]);
                                                    await handleCreateImage(e, "post", setLoadingImage, true);
                                                }}
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs dark:text-white text-primary2">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CreatePost2;
