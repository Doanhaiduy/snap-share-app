import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { ProfileContext } from "../../Context/ProfileContextProvider";
import { FaArrowRight } from "react-icons/fa";
import Search from "../../Components/Search/Search";
import logo from "../../assets/imgs/Logo.png";
import { BsFilePlusFill, BsImages, BsList } from "react-icons/bs";
import { AiFillHome, AiOutlineLogout, AiOutlineUserDelete } from "react-icons/ai";
import { IoClose, IoLogOut } from "react-icons/io5";
import { ImUserTie } from "react-icons/im";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

function Header() {
    const { currentUser, userInfo } = useContext(AuthContext);
    const { setCurrentProfile } = useContext(ProfileContext);
    const [showOption, setShowOption] = useState(false);
    const handleLogout = () => {
        signOut(auth);
    };

    const handleCloseOption = () => {
        setShowOption(false);
    };
    return (
        <div className="bg-slate-200 z-[50] flex justify-between gap-5 px-[40px] py-3 lg:px-[60px] items-center fixed top-0 left-0 right-0">
            <div className="flex items-center gap-[20px] min-w-[200px]">
                <NavLink to={"/"} className="cursor-pointer flex flex-col items-center">
                    <img src={logo} alt="" className="h-[40px]" />
                    <strong className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-600 mt-[-10px] block">
                        SnapShare
                    </strong>
                </NavLink>
                <Search />
            </div>

            <div className="flex gap-[16px] relative flex-1 justify-end">
                <div className="items-center  md:flex hidden gap-2">
                    <Tippy content="Home Page">
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
                    <Tippy content="Profile">
                        <NavLink
                            onClick={() => {
                                setCurrentProfile(userInfo);
                                localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                            }}
                            to={`/profile/${currentUser?.uid}`}
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

                    <Tippy content="Create Post">
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
                    <Tippy content="Admin Page">
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

                    <Tippy content="Logout">
                        <button
                            className="flex items-center gap-2 font-semibold text-[24px] sm:px-3 lg:px-8 py-2 bg-slate-200 hover:bg-slate-400 transition-colors rounded-[8px]"
                            onClick={handleLogout}
                        >
                            <IoLogOut />
                        </button>
                    </Tippy>
                </div>
                <di v className="items-center gap-x-5 md:hidden flex relative z-10 select-none">
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
                                to={`/profile/${currentUser?.uid}`}
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
                                onClick={handleCloseOption}
                                to="/"
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">
                                    <AiFillHome /> Home
                                </span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={handleCloseOption}
                                to="/createPost"
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">
                                    <BsFilePlusFill /> Create Post
                                </span>
                                <FaArrowRight />
                            </Link>
                            <Link
                                onClick={handleCloseOption}
                                to="/admin"
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">
                                    <AiOutlineUserDelete />
                                    Admin
                                </span>
                                <FaArrowRight />
                            </Link>
                            <div
                                onClick={handleLogout}
                                className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                            >
                                <span className="flex gap-2 items-center">
                                    <AiOutlineLogout />
                                    Logout
                                </span>
                                <FaArrowRight />
                            </div>
                        </div>
                    )}
                </di>
            </div>
        </div>
    );
}

export default Header;
