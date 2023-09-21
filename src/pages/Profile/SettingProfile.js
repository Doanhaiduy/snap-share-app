import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import { updateProfile } from "firebase/auth";
import { db } from "~/firebase/firebase-config";
import { v4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { provinces } from "./constans";
import { ThemeContext } from "~/Context/ThemeContextProvider";
import useCreateImage from "~/hooks/useCreateImage";
import { motion } from "framer-motion";
import { modalVariants } from "~/modalVariants";

function SettingProfile({ handleCloseModal, getUserInfo, userInfo, toast, handleUpdateSuccess, t }) {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState(userInfo?.name);
    const [email, setEmail] = useState(userInfo?.email);
    const [address, SetAddress] = useState(userInfo?.address);
    const [bio, setBio] = useState(userInfo?.bio);
    const [website, setWebsite] = useState(userInfo?.website);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const { darkToggle } = useContext(ThemeContext);
    const [imageAvatar, handleCreateImageAvatar, setImageAvatar] = useCreateImage();
    const [imageCover, handleCreateImageCover, setImageCover] = useCreateImage();

    const colorIcon = <LoadingOutlined style={{ fontSize: 24, color: "blue" }} spin />;
    function convertToId(name) {
        if (name.trim().length === 0) {
            return;
        }
        var id = name
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        id = id.toLowerCase();

        id = id.replace(/\s+/g, "");
        id = id.replace(/^@+/, "");
        id = "@" + id;

        return id;
    }
    const [nameID, setNameID] = useState(() => {
        if (userInfo?.nameId) {
            return userInfo?.nameId;
        }
        return convertToId(userInfo?.name);
    });

    const handleRegex = (type, value) => {
        switch (type) {
            case "fullName": {
                const validRegex =
                    /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/g;
                if (validRegex.test(value)) {
                    return true;
                } else {
                    toast.error(t("profile.setting.toast"), {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: darkToggle ? "dark" : "light",
                    });
                    return false;
                }
            }
            default:
                throw new Error("invalid type Input");
        }
    };
    useEffect(() => {
        localStorage.setItem("currentProfile", JSON.stringify(userInfo));
    }, [userInfo]);
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (handleRegex("fullName", name)) {
            const userRef = doc(db, "users", currentUser.uid);
            setIsLoading(true);
            await updateProfile(currentUser, {
                displayName: name,
                photoURL: !imageAvatar ? userInfo.photoURL : imageAvatar,
                coverImg: !imageCover ? userInfo.coverImg : imageCover,
                email,
            });
            await setDoc(
                userRef,
                {
                    bio: bio.replace(/\n/g, "<br>"),
                    name,
                    address: address || "",
                    photoURL: !imageAvatar ? userInfo.photoURL : imageAvatar,
                    email,
                    coverImg: !imageCover ? userInfo.coverImg : imageCover,
                    website: website || "",
                    nameId: convertToId(nameID) || convertToId(name),
                },
                { merge: true }
            );
            handleUpdateSuccess();
            await getUserInfo(currentUser.uid);
            setIsLoading(false);
            await handleCloseModal();
        }
    };
    // const handleShowAvatarImg = async (e) => {
    //     setLoadingImage(true);
    //     if (e.target.files[0]) {
    //         const storageRef = ref(storage, `/Avatar/${currentUser.displayName}/${e.target.files[0].name}${id()}`);
    //         const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    //         uploadTask.on(
    //             "state_changed",
    //             (snapshot) => {},
    //             (err) => console.log(err),
    //             () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                     console.log(url);
    //                     setImgAvatar(url);
    //                     setLoadingImage(false);
    //                 });
    //             }
    //         );
    //     } else {
    //     }
    // };

    // const handleShowCoverImg = async (e) => {
    //     setLoadingImage(true);
    //     if (e.target.files[0]) {
    //         const storageRef = ref(storage, `/Cover/${currentUser.displayName}/${e.target.files[0].name}${id()}`);
    //         const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    //         uploadTask.on(
    //             "state_changed",
    //             (snapshot) => {},
    //             (err) => console.log(err),
    //             () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //                     console.log(url);
    //                     setImgCover(url);
    //                     setLoadingImage(false);
    //                 });
    //             }
    //         );
    //     } else {
    //     }
    // };

    return (
        <div className="relative z-[51] ">
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 " onClick={handleCloseModal}></div>
            <motion.div
                initial={{ transform: "translateX(-50%) scale(0)" }}
                animate={{ transform: "translateX(-50%) scale(1)" }}
                exit="hidden"
                variants={modalVariants}
                className="max-w-4xl fixed top-[10%] h-[80%] translate-x-[-50%] overflow-y-auto p-6 pb-12 none no-scrollbar w-[90%] left-[50%]  bg-slate-600 rounded-md shadow-md dark:bg-[#282828]"
            >
                <span
                    onClick={handleCloseModal}
                    className="text-white  text-[3rem] absolute right-[12px] top-[-6px] cursor-pointer"
                >
                    &times;
                </span>
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">
                    {t("profile.setting.title")}
                </h1>
                <form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="fullName">
                                {t("profile.setting.name")}
                            </label>
                            <input
                                value={name}
                                id="fullName"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="emailAddress">
                                {t("profile.setting.email")}
                            </label>
                            <input
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="emailAddress"
                                type="email"
                                className="block w-full select-none pointer-events-none opacity-50 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="UserId">
                                {t("profile.setting.userId")}
                            </label>
                            <input
                                defaultValue={nameID.slice(1)}
                                onChange={(e) => setNameID(e.target.value)}
                                id="UserId"
                                type="text"
                                className="block w-full  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="website">
                                {t("profile.setting.website")}
                            </label>
                            <input
                                defaultValue={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                id="website"
                                type="text"
                                placeholder="https://snap-share-78f51.web.app/"
                                className="block w-full  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                                {t("profile.setting.address")}
                            </label>
                            <select
                                onChange={(e) => SetAddress(e.target.value)}
                                value={address}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            >
                                {provinces.map((prov) => (
                                    <option key={v4()} value={prov}>
                                        {prov}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                                {t("profile.setting.bio")}
                            </label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                id="textarea"
                                type="textarea"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">
                                {t("profile.setting.avatar")}
                            </label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-white"
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
                                    <div className="flex flex-col gap-4 text-sm text-gray-600 items-center justify-center">
                                        <label
                                            htmlFor="file-avatar"
                                            className="relative cursor-pointer bg-white p-1 rounded-md font-medium text-indigo-600 dark:text-primary1 dark:bg-[#666] hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span> {t("loadFile")}</span>
                                            <input
                                                onChange={async (e) =>
                                                    handleCreateImageAvatar(e, "Avatar", setLoadingImage)
                                                }
                                                id="file-avatar"
                                                name="file-avatar"
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        {loadingImage ? (
                                            <Spin size="large" />
                                        ) : (
                                            imageAvatar && (
                                                <img
                                                    src={imageAvatar}
                                                    alt=""
                                                    className=" xl:h-[250px] xl:w-[250px] rounded-full h-[200px] w-[200px] border mb-[12px] object-cover"
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-xs text-white">{t("limit")}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">{t("profile.setting.cover")}</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-white"
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
                                    <div className="flex text-sm text-gray-600 flex-col gap-4 items-center justify-center">
                                        <label
                                            htmlFor="file-cover"
                                            className="relative cursor-pointer bg-white p-1 rounded-md font-medium text-indigo-600 dark:text-primary1 dark:bg-[#666] hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span>{t("loadFile")}</span>
                                            <input
                                                onChange={async (e) =>
                                                    handleCreateImageCover(e, "Cover", setLoadingImage)
                                                }
                                                id="file-cover"
                                                name="file-cover"
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        {loadingImage ? (
                                            <Spin size="large" />
                                        ) : (
                                            imageCover && (
                                                <img
                                                    src={imageCover}
                                                    alt=""
                                                    className=" xl:h-[250px] w-full h-[200px] mb-[12px] object-cover rounded-[12px]"
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-xs text-white">{t("limit")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleUpdateProfile}
                            className="px-6 py-2 leading-5 text-white   transform bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-primary1 dark:hover:bg-yellow-500 dark:text-primary2 focus:outline-none focus:bg-gray-600"
                        >
                            {isLoading ? <Spin indicator={colorIcon} size="large" /> : t("profile.setting.submit")}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default SettingProfile;
