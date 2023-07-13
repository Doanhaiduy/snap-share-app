import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import SettingProfile from "./SettingProfile";
import ListPost from "~/Components/ListPost/ListPost";
import { toast } from "react-toastify";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import Tippy from "@tippyjs/react";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { NavLink, Route, Routes, useResolvedPath } from "react-router-dom";
import Friends from "~/Components/Friends/Friends";
import Followers from "~/Components/Followers/Followers";
import Following from "~/Components/Following/Following";
import Saved from "~/Components/Saved/Saved";
import About from "./About";
import Action from "./Action";
import { ThemeContext } from "~/Context/ThemeContextProvider";

function Profile({ title }) {
    const { currentUser, userInfo, getUserInfo } = useContext(AuthContext);
    const userRender = JSON.parse(localStorage.getItem("currentProfile")) || userInfo;
    const { currentProfile } = useContext(ProfileContext);
    const { t } = useContext(MultiLanguageContext);
    const { darkToggle } = useContext(ThemeContext);

    const [isShowModal, setIsShowModal] = useState(false);
    const handleShowModal = () => {
        setIsShowModal(true);
    };
    const isCurrent = userRender?.uid === currentUser?.uid;
    const handleCloseModal = () => {
        setIsShowModal(false);
    };
    useEffect(() => {
        document.title = `${userRender.name} | SnapShare`;
    }, [userRender.name]);
    const handleUpdateSuccess = async () => {
        await toast.success(t("profile.setting.toast-2"), {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: darkToggle ? "dark" : "light",
        });
    };
    const url = useResolvedPath("").pathname;
    return (
        <div className="p-[16px]  bg-slate-200 dark:bg-[#18191a] dark:text-primary5 pt-[90px] lg:col-span-4 col-span-5 h-[100vh] overflow-y-auto">
            {isShowModal ? (
                <SettingProfile
                    toast={toast}
                    handleCloseModal={handleCloseModal}
                    userInfo={userRender}
                    getUserInfo={getUserInfo}
                    handleUpdateSuccess={handleUpdateSuccess}
                    t={t}
                />
            ) : null}
            <div className=" flex flex-col items-center relative">
                <div className="absolute right-2 top-2">
                    {isCurrent ? (
                        <h3
                            className=" flex items-center gap-2 font-medium border-4 bg-black/30 px-2 py-1 rounded-[12px] cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:bg-primary1 dark:hover:text-primary2 dark:hover:border-primary1 dark:border-[#333] dark:text-[#333] "
                            onClick={handleShowModal}
                        >
                            <AiFillEdit />
                            {t("profile.update")}
                        </h3>
                    ) : null}
                </div>
                <div
                    className="bg-cover bg-center w-full h-[300px] bg-blue-700 dark:bg-primary1 rounded-[18px]"
                    style={{ backgroundImage: `url('${userRender.coverImg}')` }}
                ></div>

                <div className="absolute lg:left-0 left-1/2 translate-x-[-50%] lg:translate-x-[0]  top-[200px] lg:top-[250px] flex items-center justify-between w-auto lg:w-full gap-3 ">
                    <div className="flex flex-col lg:flex-row items-center lg:gap-3 gap-1">
                        <img
                            src={userRender?.photoURL}
                            alt=""
                            className="lg:w-[180px] w-[160px] lg:h-[180px] h-[160px] rounded-full  object-cover  relative  z-[9]"
                        />
                        <div className="lg:text-[2.6rem] sm:text-[2.2rem] text-[1.6rem] font-bold text-center flex flex-col">
                            <div className="flex  gap-3 text-center">
                                {userRender?.name}
                                {userRender.verified && (
                                    <div className="inline relative group ">
                                        <Tippy
                                            placement="top"
                                            content={
                                                <p className="text-[14px] max-w-[350px] text-white font-[500] text-left shadow-2xl p-1  rounded-[6px] ">
                                                    {t("profile.confirmed")}
                                                </p>
                                            }
                                        >
                                            <div className="inline-flex pt-[12px]">
                                                <BsFillCheckCircleFill className="text-[18px] inline text-[#5890ff] dark:text-primary1 ml-[-6px] mt-[4px] cursor-pointer"></BsFillCheckCircleFill>
                                            </div>
                                        </Tippy>
                                    </div>
                                )}
                            </div>
                            <span className="lg:text-xl text-sm font-semibold text-center lg:text-left ">
                                {userRender?.nameId}
                            </span>
                        </div>
                    </div>
                </div>
                {!isCurrent && <Action t={t} uidCurrent={userRender?.uid} uid={currentUser?.uid} />}
            </div>
            <div className="lg:grid grid-cols-3 mt-[160px] gap-4">
                <About userRender={userRender} isCurrent={isCurrent} handleShowModal={handleShowModal} />
                <div className="col-span-2 ">
                    <nav className="relative lg:px-8 px-4 py-4  ">
                        <ul className="flex justify-between items-center ">
                            <li>
                                <NavLink
                                    to={`${url}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "font-semibold text-lg hover:text-blue-600 border-b-2 border-blue-600 dark:border-primary1 dark:hover:text-primary1 dark:text-primary1 text-blue-600 "
                                            : " font-semibold dark:text-primary5 text-primary2 text-lg hover:text-blue-600 dark:hover:text-primary1 "
                                    }
                                >
                                    {t("profile.posts")}
                                </NavLink>
                            </li>
                            <li className="text-primary2 dark:text-primary5 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-4 h-4 current-fill"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </li>
                            <li>
                                <NavLink
                                    to={`${url}/friend`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? " font-semibold text-lg hover:text-blue-600 border-b-2 border-blue-600 dark:border-primary1 dark:hover:text-primary1 dark:text-primary1 text-blue-600 "
                                            : " font-semibold dark:text-primary5 text-primary2 text-lg hover:text-blue-600 dark:hover:text-primary1 "
                                    }
                                >
                                    {t("profile.friend")}
                                </NavLink>
                            </li>
                            <li className="text-primary2 dark:text-primary5 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-4 h-4 current-fill"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </li>
                            <li>
                                <NavLink
                                    to={`${url}/followers`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "font-semibold text-lg hover:text-blue-600 border-b-2 border-blue-600 dark:border-primary1 dark:hover:text-primary1 dark:text-primary1 text-blue-600 "
                                            : " font-semibold dark:text-primary5 text-primary2 text-lg hover:text-blue-600 dark:hover:text-primary1 "
                                    }
                                >
                                    {t("profile.followers")}
                                </NavLink>
                            </li>
                            <li className="text-primary2 dark:text-primary5 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-4 h-4 current-fill"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </li>
                            <li>
                                <NavLink
                                    to={`${url}/following`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "font-semibold text-lg hover:text-blue-600 border-b-2 border-blue-600 dark:border-primary1 dark:hover:text-primary1 dark:text-primary1 text-blue-600 "
                                            : " font-semibold dark:text-primary5 text-primary2 text-lg hover:text-blue-600 dark:hover:text-primary1 "
                                    }
                                >
                                    {t("profile.following")}
                                </NavLink>
                            </li>
                            <li className="text-primary2 dark:text-primary5 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-4 h-4 current-fill"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                    />
                                </svg>
                            </li>
                            <li>
                                <NavLink
                                    to={`${url}/saved`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "font-semibold text-lg hover:text-blue-600 border-b-2 border-blue-600 dark:border-primary1 dark:hover:text-primary1 dark:text-primary1 text-blue-600 "
                                            : " font-semibold dark:text-primary5 text-primary2 text-lg hover:text-blue-600 dark:hover:text-primary1 "
                                    }
                                >
                                    {t("profile.saved")}
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path={`/`} element={<ListPost userRender={userRender} />} />
                        <Route path={`/friend`} element={<Friends uid={userRender?.uid} />} />
                        <Route path={`/followers`} element={<Followers uid={userRender?.uid} />} />
                        <Route path={`/following`} element={<Following uid={userRender?.uid} />} />
                        <Route path={`/saved`} element={<Saved uid={userRender?.uid} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Profile;
