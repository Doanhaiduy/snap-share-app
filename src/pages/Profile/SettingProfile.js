import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../firebase/firebase-config";
import { v4 as id, v4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { provinces } from "./constans";

function SettingProfile({ handleCloseModal, getUserInfo, userInfo, toast, handleUpdateSuccess, t }) {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState(userInfo?.name);
    const [email, setEmail] = useState(userInfo?.email);
    const [address, SetAddress] = useState(userInfo?.address);
    const [bio, setBio] = useState(userInfo?.bio);
    const [website, setWebsite] = useState(userInfo?.website);
    const [imgAvatar, setImgAvatar] = useState(null);
    const [imgCover, setImgCover] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const colorIcon = <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />;
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
                        theme: "light",
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
                photoURL: !imgAvatar ? userInfo.photoURL : imgAvatar,
                coverImg: !imgCover ? userInfo.coverImg : imgCover,
                email,
            });
            await setDoc(
                userRef,
                {
                    bio: bio.replace(/\n/g, "<br>"),
                    name,
                    address: address || "",
                    photoURL: !imgAvatar ? userInfo.photoURL : imgAvatar,
                    email,
                    coverImg: !imgCover ? userInfo.coverImg : imgCover,
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
        <div className="relative z-[51]">
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 " onClick={handleCloseModal}></div>
            {/* <form className=" dark:bg-slate-600 bg-slate-300 p-5 absolute w-[50%] rounded-[12px] left-[50%] translate-x-[-50%] ">
                <span
                    onClick={handleCloseModal}
                    className="dark:text-white  text-[3rem] absolute right-[12px] top-[-6px] cursor-pointer"
                >
                    &times;
                </span>
                <h2 className="sm:text-[1.6rem]  mb-[20px] text-[1rem] lg:text-[3rem] text-center font-bold dark:text-white">
                    {t("profile.setting.title")}
                </h2>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 sm:text-[1.5rem] text-[1rem] lg:text-[2rem] font-medium text-gray-900 dark:text-primary5 "
                    >
                        {t("profile.setting.name")}
                    </label>
                    <input
                        value={name}
                        type="text"
                        id="name"
                        className="shadow-sm  bg-gray-50 border border-gray-300 text-gray-900 sm:text-[1.5rem] text-[1rem] lg:text-[2rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-primary5  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="bio"
                        className="block mb-2 sm:text-[1.5rem] text-[1rem] lg:text-[2rem] font-medium text-gray-900 dark:text-primary5 "
                    >
                        {t("profile.setting.bio")}
                    </label>
                    <textarea
                        placeholder="Enter your bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        id="bio"
                        className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-[1.5rem] text-[1rem] lg:text-[2rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-primary5  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light h-[160px]"
                        required
                    />
                </div>
                <div className="mb-6 pointer-events-none">
                    <label
                        htmlFor="email"
                        className="block mb-2 sm:text-[1.5rem] text-[1rem] lg:text-[2rem] font-medium text-gray-900 dark:text-primary5 "
                    >
                        {t("profile.setting.email")}
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        className="opacity-50 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-[1.5rem] text-[1rem] lg:text-[2rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-primary5  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                    />
                </div>
                <div className="flex justify-between lg:flex-row flex-col">
                    <div className="lg:w-[50%] flex flex-col items-center">
                        <div className="mb-6 flex flex-col items-center ">
                            <label
                                htmlFor="avatar"
                                className="cursor-pointer mb-2 flex flex-col items-center sm:text-[1.5rem] text-[1rem] lg:text-[2rem] font-medium text-gray-900 dark:text-primary5 "
                            >
                                {t("profile.setting.avatar")}
                                <FcAddImage className="text-[60px]" />
                            </label>
                            <input
                                onChange={handleShowAvatarImg}
                                type="file"
                                id="avatar"
                                className="text-transparent hidden  sm:text-[1.5rem] text-[1rem] "
                                required
                            />
                        </div>
                        {loadingImage ? (
                            <Spin size="large" />
                        ) : (
                            imgAvatar && (
                                <img
                                    src={imgAvatar}
                                    alt=""
                                    className=" xl:h-[250px] xl:w-[250px] rounded-full h-[200px] w-[200px] border mb-[12px] object-cover"
                                />
                            )
                        )}
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <div className="mb-6 flex flex-col items-center">
                            <label
                                htmlFor="cover"
                                className="cursor-pointer flex flex-col items-center mb-2 sm:text-[1.5rem] text-[1rem] lg:text-[2rem] font-medium text-gray-900 dark:text-primary5 "
                            >
                                {t("profile.setting.cover")}
                                <FcAddImage className="text-[60px]" />
                            </label>
                            <input
                                onChange={handleShowCoverImg}
                                type="file"
                                id="cover"
                                className="text-transparent hidden sm:text-[1.5rem] text-[1rem]"
                                required
                            />
                        </div>

                        {loadingImage ? (
                            <Spin size="large" />
                        ) : (
                            imgCover && (
                                <img
                                    src={imgCover}
                                    alt=""
                                    className=" xl:h-[250px] w-full h-[200px] mb-[12px] object-cover rounded-[12px]"
                                />
                            )
                        )}
                    </div>
                </div>

                <button
                    onClick={handleUpdateProfile}
                    type="submit"
                    className="text-[1rem]  inline-flex items-center justify-center px-4 py-4 hover:opacity-90 font-sans font-semibold tracking-wide text-white bg-blue-500 dark:text-primary2 dark:bg-primary1 rounded-lg h-[40px] "
                >
                    {isLoading ? <Spin indicator={colorIcon} size="large" /> : t("profile.setting.submit")}
                </button>
            </form> */}
            <section className="max-w-4xl fixed bottom-[-20px] sm:h-auto h-[100vh] overflow-y-auto p-6 pb-12 none no-scrollbar  mx-auto left-[50%] w-[90%] translate-x-[-50%] bg-slate-600 rounded-md shadow-md dark:bg-[#282828]">
                <span
                    onClick={handleCloseModal}
                    className="text-white  text-[3rem] absolute right-[12px] top-[-6px] cursor-pointer"
                >
                    &times;
                </span>
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Account settings</h1>
                <form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200" htmlFor="fullName">
                                Full Name
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
                                Email Address
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
                                User id
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
                                Website
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
                                Address
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
                                Bio
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
                            <label className="block text-sm font-medium text-white">Avatar</label>
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
                                            <span>Upload a file</span>
                                            <input
                                                onChange={handleShowAvatarImg}
                                                id="file-avatar"
                                                name="file-avatar"
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        {loadingImage ? (
                                            <Spin size="large" />
                                        ) : (
                                            imgAvatar && (
                                                <img
                                                    src={imgAvatar}
                                                    alt=""
                                                    className=" xl:h-[250px] xl:w-[250px] rounded-full h-[200px] w-[200px] border mb-[12px] object-cover"
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Cover</label>
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
                                            <span>Upload a file</span>
                                            <input
                                                onChange={handleShowCoverImg}
                                                id="file-cover"
                                                name="file-cover"
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                        {loadingImage ? (
                                            <Spin size="large" />
                                        ) : (
                                            imgCover && (
                                                <img
                                                    src={imgCover}
                                                    alt=""
                                                    className=" xl:h-[250px] w-full h-[200px] mb-[12px] object-cover rounded-[12px]"
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleUpdateProfile}
                            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-primary1 dark:hover:bg-yellow-500 dark:text-primary2 focus:outline-none focus:bg-gray-600"
                        >
                            {isLoading ? <Spin indicator={colorIcon} size="large" /> : "Save"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default SettingProfile;
