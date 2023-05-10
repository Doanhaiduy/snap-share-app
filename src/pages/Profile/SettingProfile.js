import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/firebase-config";
import { v4 as id } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function SettingProfile({ handleCloseModal, getUserInfo, userInfo }) {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState(userInfo?.name);
    const [email, setEmail] = useState(userInfo?.email);
    const [bio, setBio] = useState(userInfo?.bio);
    const [imgAvatar, setImgAvatar] = useState(null);
    const [imgCover, setImgCover] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const colorIcon = <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />;
    useEffect(() => {
        localStorage.setItem("currentProfile", JSON.stringify(userInfo));
    }, []);
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const userRef = doc(db, "users", currentUser.uid);
        setIsLoading(true);
        await updateProfile(currentUser, {
            displayName: name,
            photoURL: !imgAvatar ? userInfo.photoURL : imgAvatar,
            coverImg: !imgCover ? userInfo.coverImg : imgCover,
        });
        await setDoc(
            userRef,
            {
                bio,
                name,
                photoURL: !imgAvatar ? userInfo.photoURL : imgAvatar,
                email,
                coverImg: !imgCover ? userInfo.coverImg : imgCover,
            },
            { merge: true }
        );
        await getUserInfo(currentUser.uid);
        setIsLoading(false);
        await handleCloseModal();
    };
    const handleShowAvatarImg = async (e) => {
        setLoadingImage(true);
        if (e.target.files[0]) {
            const storageRef = ref(storage, `/Avatar/${currentUser.displayName}/${e.target.files[0].name}${id()}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        setImgAvatar(url);
                        setLoadingImage(false);
                    });
                }
            );
        } else {
        }
    };
    const handleShowCoverImg = async (e) => {
        setLoadingImage(true);
        if (e.target.files[0]) {
            const storageRef = ref(storage, `/Cover/${currentUser.displayName}/${e.target.files[0].name}${id()}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        setImgCover(url);
                        setLoadingImage(false);
                    });
                }
            );
        } else {
        }
    };
    return (
        <div className="relative z-10">
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70" onClick={handleCloseModal}></div>
            <form className="bg-slate-600 p-5 absolute w-[70vw] rounded-[12px] left-[50%] translate-x-[-50%] ">
                <span
                    onClick={handleCloseModal}
                    className="text-white text-[3rem] absolute right-[12px] top-0 cursor-pointer"
                >
                    &times;
                </span>
                <h2 className="text-[3rem] text-center font-bold text-white">Update Profile</h2>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-[2rem] font-medium text-gray-900 dark:text-white">
                        Your Name
                    </label>
                    <input
                        value={name}
                        type="text"
                        id="name"
                        className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 text-[2rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="bio" className="block mb-2 text-[2rem] font-medium text-gray-900 dark:text-white">
                        Your Bio
                    </label>
                    <textarea
                        placeholder="Enter your bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        id="bio"
                        className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-[2rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light h-[160px]"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-[2rem] font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-[2rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>
                <div className="flex justify-between">
                    <div className="">
                        <div className="mb-6">
                            <label
                                htmlFor="avatar"
                                className="block mb-2 text-[2rem] font-medium text-gray-900 dark:text-white"
                            >
                                Avatar
                            </label>
                            <input
                                onChange={handleShowAvatarImg}
                                type="file"
                                id="avatar"
                                className="text-white text-[1.5rem]"
                                required
                            />
                        </div>
                        {loadingImage ? (
                            <Spin size="large" />
                        ) : (
                            imgAvatar && (
                                <img src={imgAvatar} alt="" className="w-[200px] h-[250px] mb-[12px] object-cover" />
                            )
                        )}
                    </div>
                    <div className="">
                        <div className="mb-6">
                            <label
                                htmlFor="cover"
                                className="block mb-2 text-[2rem] font-medium text-gray-900 dark:text-white"
                            >
                                Cover
                            </label>
                            <input
                                onChange={handleShowCoverImg}
                                type="file"
                                id="cover"
                                className="text-white text-[1.5rem]"
                                required
                            />
                        </div>

                        {loadingImage ? (
                            <Spin size="large" />
                        ) : (
                            imgCover && (
                                <img src={imgCover} alt="" className="w-full h-[250px] mb-[12px] object-cover" />
                            )
                        )}
                    </div>
                </div>

                <button
                    onClick={handleUpdateProfile}
                    type="submit"
                    className=" text-white bg-blue-700 min-w-[208px] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[1.6rem]  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {isLoading ? <Spin indicator={colorIcon} size="large" /> : "Update Profile"}
                </button>
            </form>
        </div>
    );
}

export default SettingProfile;
