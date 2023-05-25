import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import NewsFeed from "../../Components/NewsFeed/NewsFeed";
import { ProfileContext } from "../../Context/ProfileContextProvider";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import Search from "../../Components/Search/Search";
import logo from "../../assets/imgs/Logo.png";
import { BsFilePlusFill, BsList } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineUserDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

function Home() {
    const { currentUser, userInfo } = useContext(AuthContext);
    const { setCurrentProfile } = useContext(ProfileContext);
    const [showOption, setShowOption] = useState(false);
    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div className="bg-slate-200">
            <div className="py-[20px] flex justify-between gap-5 px-[40px] lg:px-[100px] items-center   ">
                <div className="flex flex-1 items-center gap-[12px] min-w-[200px]">
                    <img src={logo} alt="" className="h-[70px]" />
                    <Search />
                </div>

                <div className="flex gap-[16px] relative">
                    <div className="items-center gap-x-5 md:flex hidden" aria-label="button-combination">
                        <Link
                            onClick={() => {
                                setCurrentProfile(userInfo);
                                localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                            }}
                            to={`/profile/${currentUser?.uid}`}
                            className="inline-flex items-center justify-center px-4 lg:px-8 py-4 hover:opacity-90 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/postImage"
                            className="inline-flex gap-3 items-center justify-center px-4 lg:px-8 py-4 font-sans font-semibold tracking-wide text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 transition-colors duration-300 rounded-lg h-[60px]"
                        >
                            <FaPlus />
                            Post Image
                        </Link>
                        <Link
                            to="/admin"
                            className="inline-flex items-center justify-center px-4 lg:px-8 py-4 hover:opacity-90  font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                        >
                            Admin
                        </Link>
                        <button
                            className="inline-flex items-center justify-center px-4 lg:px-8 py-4 hover:opacity-90  font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    <div className="items-center gap-x-5 md:hidden flex relative z-10 select-none">
                        {showOption ? (
                            <IoClose
                                className="text-[50px] font-[600] cursor-pointer"
                                onClick={() => setShowOption(!showOption)}
                            />
                        ) : (
                            <BsList
                                className="text-[50px] font-[600] cursor-pointer"
                                onClick={() => setShowOption(!showOption)}
                            />
                        )}

                        {showOption && (
                            <div className="bg-slate-100  shadow-2xl gap-x-5 flex flex-col absolute  top-[60px] w-[240px] py-3 rounded-[12px] right-0 text-[20px]">
                                <Link
                                    onClick={() => {
                                        setCurrentProfile(userInfo);
                                        localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                                    }}
                                    to={`/profile/${currentUser?.uid}`}
                                    className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex items-center gap-[12px] border-b-2"
                                >
                                    <img src={userInfo.photoURL} className="w-[40px] rounded-full" alt="" />
                                    <span className="font-semibold ">{userInfo.name}</span>
                                </Link>
                                <Link
                                    to="/postImage"
                                    className="py-[6px] px-[10px] cursor-pointer transition-colors  hover:bg-slate-200 flex font-semibold items-center justify-between gap-[12px]"
                                >
                                    <span className="flex gap-2 items-center">
                                        <BsFilePlusFill /> Post Image
                                    </span>
                                    <FaArrowRight />
                                </Link>
                                <Link
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
                    </div>
                </div>
            </div>
            <NewsFeed />
        </div>
    );
}

export default Home;
