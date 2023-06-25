import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { ProfileContext } from "../../Context/ProfileContextProvider";
import { FaArrowRight, FaLanguage } from "react-icons/fa";
import Search from "../../Components/Search/Search";
import logo from "../../assets/imgs/Logo.png";
import { BsFilePlusFill, BsImages, BsList, BsPlus } from "react-icons/bs";
import { AiFillHome, AiOutlineLogout, AiOutlinePlusSquare, AiOutlineUserDelete } from "react-icons/ai";
import { IoClose, IoLogOut } from "react-icons/io5";
import { ImUserTie } from "react-icons/im";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import { MultiLanguageContext } from "../../Context/MultiLanguageContextProvider";

function Header() {
    const { currentUser, userInfo } = useContext(AuthContext);
    const { setCurrentProfile } = useContext(ProfileContext);
    const [showOption, setShowOption] = useState(false);
    const { t, handleChangeLanguage } = useContext(MultiLanguageContext);
    const handleLogout = () => {
        signOut(auth);
    };

    const handleCloseOption = () => {
        setShowOption(false);
    };

    return (
        <div className="bg-white dark:bg-[#282828]  z-[50] flex justify-between gap-5 px-[40px] py-3 lg:px-[60px] items-center fixed top-0 left-0 right-0">
            <div className="flex justify-between w-full items-center">
                <NavLink to={"/"} className="cursor-pointer flex items-center">
                    <img src={logo} alt="" className="h-[40px]" />
                    <strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-600 block">
                        SnapShare
                    </strong>
                </NavLink>
                <div className="flex gap-4 items-center ">
                    <Search />
                    <Link
                        to={"/createPost"}
                        className="text-[14px] sm:flex hidden transition-all duration-300 ease-in-out  gap-1 items-center cursor-pointer hover:opacity-90 h-[40px] px-3 text-white font-medium rounded-[12px] bg-blue-600  dark:text-primary2 dark:bg-primary1"
                    >
                        <AiOutlinePlusSquare className="text-[20px]" /> Create
                    </Link>
                    <div className="">
                        <img
                            className="h-[40px] cursor-pointer w-[40px] rounded-[12px] object-cover"
                            src={userInfo.photoURL}
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div className=" flex hidden gap-[16px] relative flex-1 justify-end">
                <div className="items-center md:flex hidden gap-2">
                    <Tippy content={t("home.home")}>
                        <NavLink
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2  hover:bg-slate-400 transition-colors border-b-4 border-blue-600  rounded-[8px] bg-gray-300 text-blue-600"
                                    : "flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2 bg-slate-200 hover:bg-slate-400 transition-colors rounded-[8px]"
                            }
                        >
                            <AiFillHome />
                        </NavLink>
                    </Tippy>
                    <Tippy content={t("home.profile")}>
                        <NavLink
                            onClick={() => {
                                setCurrentProfile(userInfo);
                                localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                            }}
                            to={`/profile/${userInfo?.nameId || currentUser?.uid}`}
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2  hover:bg-slate-400 transition-colors border-b-4 border-blue-600  rounded-[8px] bg-gray-300 text-blue-600"
                                    : "flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2 bg-slate-200 hover:bg-slate-400 transition-colors rounded-[8px]"
                            }
                        >
                            <img
                                src={userInfo?.photoURL}
                                className="w-[24px] h-[24px] object-cover rounded-full"
                                alt=""
                            />
                        </NavLink>
                    </Tippy>

                    <Tippy content={t("home.createPost")}>
                        <NavLink
                            to="/createPost"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2  hover:bg-slate-400 transition-colors border-b-4 border-blue-600  rounded-[8px] bg-gray-300 text-blue-600"
                                    : "flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2 bg-slate-200 hover:bg-slate-400 transition-colors rounded-[8px]"
                            }
                        >
                            <BsImages />
                        </NavLink>
                    </Tippy>
                    {currentUser?.uid !== "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2" &&
                    window.location.hostname !== "localhost" ? null : (
                        <Tippy content={t("home.admin")}>
                            <NavLink
                                to="/admin"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2  hover:bg-slate-400 transition-colors border-b-4 border-blue-600  rounded-[8px] bg-gray-300 text-blue-600"
                                        : "flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2 bg-slate-200 hover:bg-slate-400 transition-colors rounded-[8px]"
                                }
                            >
                                <ImUserTie />
                            </NavLink>
                        </Tippy>
                    )}
                    <button className="flex items-center gap-2 font-semibold text-[24px] relative sm:px-3 lg:px-8 group py-2 bg-slate-200 hover:bg-slate-400 transition-colors rounded-[8px]">
                        <FaLanguage />
                        <div className="group-hover:block hover:block hidden absolute bottom-[-280px] left-0">
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("vi");
                                }}
                                className="py-[6px]  px-[10px] cursor-pointer transition-colors  hover:bg-slate-100 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">VI</span>
                                <FaArrowRight />
                            </Link>

                            <Link
                                onClick={() => {
                                    handleChangeLanguage("en");
                                }}
                                className="py-[6px]  px-[10px] cursor-pointer transition-colors  hover:bg-slate-100 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">EN</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("ko");
                                }}
                                className="py-[6px]  px-[10px] cursor-pointer transition-colors  hover:bg-slate-100 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">KO</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("th");
                                }}
                                className="py-[6px]  px-[10px] cursor-pointer transition-colors  hover:bg-slate-100 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">TH</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("fr");
                                }}
                                className="py-[6px]  px-[10px] cursor-pointer transition-colors  hover:bg-slate-100 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">FR</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("tw");
                                }}
                                className="py-[6px]  px-[10px] cursor-pointer transition-colors  hover:bg-slate-100 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">TW</span>
                                <FaArrowRight />
                            </Link>
                        </div>
                    </button>
                    <Tippy content={t("home.logout")}>
                        <button
                            className="flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2 bg-slate-200 hover:bg-slate-400 transition-colors rounded-[8px]"
                            onClick={handleLogout}
                        >
                            <IoLogOut />
                        </button>
                    </Tippy>
                </div>
                <div className="items-center gap-x-5 md:hidden flex relative z-10 select-none">
                    {showOption ? (
                        <IoClose
                            className="text-[40px] font-[600] cursor-pointer"
                            onClick={() => setShowOption(!showOption)}
                        />
                    ) : (
                        <BsList
                            className="text-[40px] font-[600] cursor-pointer"
                            onClick={() => setShowOption(!showOption)}
                        />
                    )}

                    {showOption && (
                        <div className="bg-slate-100  shadow-2xl gap-x-5 flex flex-col absolute  top-[60px] w-[240px] py-3 rounded-[12px] right-0 text-[20px]">
                            <Link
                                onClick={() => {
                                    setCurrentProfile(userInfo);
                                    localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                                    handleCloseOption();
                                }}
                                to={`/profile/${currentUser?.nameId || currentUser?.uid}`}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex items-center gap-[12px] border-b-2"
                            >
                                <img
                                    src={userInfo.photoURL}
                                    className="w-[40px] h-[40px] object-cover rounded-full "
                                    alt=""
                                />
                                <span className="font-semibold line-clamp-1">{userInfo.name}</span>
                            </Link>

                            <Link
                                onClick={() => {
                                    handleChangeLanguage("vi");
                                }}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">VI</span>
                                <FaArrowRight />
                            </Link>

                            <Link
                                onClick={() => {
                                    handleChangeLanguage("en");
                                }}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">EN</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("ko");
                                }}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">KO</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("th");
                                }}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">TH</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("fr");
                                }}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">FR</span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={() => {
                                    handleChangeLanguage("tw");
                                }}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">TW</span>
                                <FaArrowRight />
                            </Link>

                            <Link
                                onClick={handleCloseOption}
                                to="/"
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">
                                    <AiFillHome /> {t("home.home")}
                                </span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={handleCloseOption}
                                to="/createPost"
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">
                                    <BsFilePlusFill /> {t("home.createPost")}
                                </span>
                                <FaArrowRight />
                            </Link>
                            {currentUser?.uid !== "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2" &&
                            window.location.hostname !== "localhost" ? null : (
                                <Link
                                    onClick={handleCloseOption}
                                    to="/admin"
                                    className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                                >
                                    <span className="flex gap-2 items-center">
                                        <AiOutlineUserDelete />
                                        {t("home.admin")}
                                    </span>
                                    <FaArrowRight />
                                </Link>
                            )}
                            <div
                                onClick={handleLogout}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">
                                    <AiOutlineLogout />
                                    {t("home.logout")}
                                </span>
                                <FaArrowRight />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Header;
