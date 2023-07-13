import React from "react";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { BsChatFill, BsImages } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IoLanguageSharp, IoLogOut } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import "tippy.js/dist/tippy.css"; // optional
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "~/firebase/firebase-config";
import { AuthContext } from "~/Context/AuthContextProvider";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import { RiAdminFill } from "react-icons/ri";
import Tippy from "@tippyjs/react";
import { ChatsContext } from "~/Context/ChatsContext";
import useUser from "~/hooks/useUser";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { format } from "date-fns";

function Navbar() {
    const { currentUser, userInfo } = useContext(AuthContext);
    const { setCurrentProfile } = useContext(ProfileContext);
    const { windowChat, getWindowChat, chooseListContact, setWindowChat } = useContext(ChatsContext);
    // const { user: adminUser } = useUser("8PMSfcs0yf8Dhed7T6zNR6q7zl1s");
    const { user: adminUser } = useUser("JpVAJcvpx4dxKc7l7ro8zLx6r0Y2");

    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    const { t } = useContext(MultiLanguageContext);
    const setMessAdmin = async () => {
        const combinedId =
            currentUser?.uid < adminUser?.uid ? currentUser?.uid + adminUser.uid : adminUser?.uid + currentUser?.uid;
        try {
            const docRef = doc(db, "chats", combinedId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                // create chat in chats collection
                await setDoc(docRef, {
                    id: combinedId,
                    senderID: currentUser?.uid,
                    receiverID: adminUser?.uid,
                    image: [],
                    file: [],
                    link: [],
                    message: [],
                    timestamp: currentDate,
                });
                await getWindowChat(combinedId);
            }
            if (docSnap.exists()) {
                await getWindowChat(combinedId);
            }
            chooseListContact(userInfo, adminUser);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        signOut(auth);
    };
    return (
        <div className="col-span-1  max-h-[100vh] h-auto flex flex-col gap-6 mx-auto pt-[80px] ">
            <Link
                to={`/profile/${userInfo?.nameId || currentUser?.uid}`}
                onClick={() => {
                    setCurrentProfile(userInfo);
                    localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                }}
                className="cursor-pointer p-5 rounded-[12px] bg-white dark:bg-[#282828] dark:text-primary5 dark:hover:bg-[#555] hover:bg-slate-200"
            >
                <div className="flex gap-2 items-center">
                    <div className="">
                        <img
                            className="min-w-[40px] min-h-[40px] h-[40px] w-[40px] object-cover rounded-[8px]"
                            src={userInfo?.photoURL}
                            alt=""
                        />
                    </div>
                    <div className="max-w-[160px] lg:block hidden">
                        <h3 className="font-bold leading-4">{currentUser?.displayName}</h3>
                        <span className="text-[14px] text-gray-400 line-clamp-1">{userInfo?.nameId}</span>
                    </div>
                </div>
            </Link>
            <div className="py-2 rounded-[12px] bg-white dark:bg-[#282828]">
                <NavLink
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={({ isActive }) =>
                        isActive
                            ? "border-l-[3px] border-l-blue-600  dark:border-l-primary1 dark:text-primary1 flex gap-4 items-center border-b-[1px] border-[#fafafa] text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 bg-slate-300 dark:border-gray-600/20  dark:bg-[#555]"
                            : "border-l-[3px]  hover:border-l-blue-600 dark:hover:border-l-primary1 dark:hover:text-primary1 flex gap-4 items-center border-[#fafafa] border-b-[1px] hover:text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 hover:bg-slate-300 dark:border-gray-600/20 dark:text-primary5 dark:hover:bg-[#555]"
                    }
                >
                    <Tippy content={t("nav.home")} placement="right">
                        <div className="">
                            <AiFillHome className="ml-5" />
                        </div>
                    </Tippy>
                    <span className="lg:hidden sm:inline-block"></span>
                    <h3 className="font-bold hidden lg:block">{t("nav.home")}</h3>
                </NavLink>
                <NavLink
                    to={`/profile/${userInfo?.nameId || currentUser?.uid}`}
                    onClick={() => {
                        setCurrentProfile(userInfo);
                        localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                    }}
                    className={({ isActive }) =>
                        isActive
                            ? "border-l-[3px] border-l-blue-600 border-[#fafafa] dark:border-l-primary1 dark:text-primary1 flex gap-4 items-center border-b-[1px] text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 bg-slate-300 dark:border-gray-600/20  dark:bg-[#555]"
                            : "border-l-[3px] hover:border-l-blue-600 border-[#fafafa] dark:hover:border-l-primary1 dark:hover:text-primary1 flex gap-4 items-center border-b-[1px] hover:text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 hover:bg-slate-300 dark:border-gray-600/20 dark:text-primary5 dark:hover:bg-[#555]"
                    }
                >
                    <Tippy content={t("nav.profile")} placement="right">
                        <div className="">
                            <FaUser className="ml-5" />
                        </div>
                    </Tippy>
                    <span className="lg:hidden sm:inline-block"></span>
                    <h3 className="font-bold hidden lg:block">{t("nav.profile")}</h3>
                </NavLink>
                {/* <NavLink
                    to="/createPost"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={({ isActive }) =>
                        isActive
                            ? "border-l-[3px] border-l-blue-600 border-[#fafafa] dark:border-l-primary1 dark:text-primary1 flex gap-4 items-center border-b-[1px] text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 bg-slate-300 dark:border-gray-600/20  dark:bg-[#555]"
                            : "border-l-[3px] hover:border-l-blue-600 border-[#fafafa] dark:hover:border-l-primary1 dark:hover:text-primary1 flex gap-4 items-center border-b-[1px] hover:text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 hover:bg-slate-300 dark:border-gray-600/20 dark:text-primary5 dark:hover:bg-[#555]"
                    }
                >
                    <Tippy content={t("nav.createPost")} placement="right">
                        <div className="">
                            <BsImages className="ml-5" />
                        </div>
                    </Tippy>
                    <span className="lg:hidden sm:inline-block"></span>
                    <h3 className="font-bold hidden lg:block">{t("nav.createPost")}</h3>
                </NavLink> */}
                {currentUser?.uid === "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2" || window.location.hostname === "localhost" ? (
                    <NavLink
                        to="/admin"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className={({ isActive }) =>
                            isActive
                                ? "border-l-[3px] border-l-blue-600 border-[#fafafa] dark:border-l-primary1 dark:text-primary1 flex gap-4 items-center border-b-[1px] text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 bg-slate-300 dark:border-gray-600/20  dark:bg-[#555]"
                                : "border-l-[3px] hover:border-l-blue-600 border-[#fafafa] dark:hover:border-l-primary1 dark:hover:text-primary1 flex gap-4 items-center border-b-[1px] hover:text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 hover:bg-slate-300 dark:border-gray-600/20 dark:text-primary5 dark:hover:bg-[#555]"
                        }
                    >
                        <Tippy content={t("nav.admin")} placement="right">
                            <div className="">
                                <RiAdminFill className="ml-5" />
                            </div>
                        </Tippy>
                        <span className="lg:hidden sm:inline-block"></span>
                        <h3 className="font-bold hidden lg:block">{t("nav.admin")}</h3>
                    </NavLink>
                ) : null}

                <NavLink
                    to="/friend"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={({ isActive }) =>
                        isActive
                            ? "border-l-[3px] border-l-blue-600 border-[#fafafa] dark:border-l-primary1 dark:text-primary1 flex gap-4 items-center border-b-[1px] text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 bg-slate-300 dark:border-gray-600/20  dark:bg-[#555]"
                            : "border-l-[3px] hover:border-l-blue-600 border-[#fafafa] dark:hover:border-l-primary1 dark:hover:text-primary1 flex gap-4 items-center border-b-[1px] hover:text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 hover:bg-slate-300 dark:border-gray-600/20 dark:text-primary5 dark:hover:bg-[#555]"
                    }
                >
                    <Tippy content={t("nav.friend")} placement="right">
                        <div className="">
                            <FaUserFriends className="ml-5" />
                        </div>
                    </Tippy>
                    <span className="lg:hidden sm:inline-block"></span>
                    <h3 className="font-bold hidden lg:block">{t("nav.friend")}</h3>
                </NavLink>
                <NavLink
                    to="/chats"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setMessAdmin();
                    }}
                    className={({ isActive }) =>
                        isActive
                            ? "border-l-[3px] border-l-blue-600 border-[#fafafa] dark:border-l-primary1 dark:text-primary1 flex gap-4 items-center border-b-[1px] text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 bg-slate-300 dark:border-gray-600/20  dark:bg-[#555]"
                            : "border-l-[3px] hover:border-l-blue-600 border-[#fafafa] dark:hover:border-l-primary1 dark:hover:text-primary1 flex gap-4 items-center border-b-[1px] hover:text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 hover:bg-slate-300 dark:border-gray-600/20 dark:text-primary5 dark:hover:bg-[#555]"
                    }
                >
                    <Tippy content={t("nav.mess")} placement="right">
                        <div className="">
                            <BsChatFill className="ml-5" />
                        </div>
                    </Tippy>
                    <span className="lg:hidden sm:inline-block"></span>
                    <h3 className="font-bold hidden lg:block">{t("nav.mess")}</h3>
                </NavLink>
                <NavLink
                    to="/language"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={({ isActive }) =>
                        isActive
                            ? "border-l-[3px] border-l-blue-600 border-[#fafafa] dark:border-l-primary1 dark:text-primary1 flex gap-4 items-center border-b-[1px] text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 bg-slate-300 dark:border-gray-600/20  dark:bg-[#555]"
                            : "border-l-[3px] hover:border-l-blue-600 border-[#fafafa] dark:hover:border-l-primary1 dark:hover:text-primary1 flex gap-4 items-center border-b-[1px] hover:text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 hover:bg-slate-300 dark:border-gray-600/20 dark:text-primary5 dark:hover:bg-[#555]"
                    }
                >
                    <Tippy content={t("nav.language")} placement="right">
                        <div className="">
                            <IoLanguageSharp className="ml-5" />
                        </div>
                    </Tippy>
                    <span className="lg:hidden sm:inline-block"></span>
                    <h3 className="font-bold hidden lg:block">{t("nav.language")}</h3>
                </NavLink>
                <NavLink
                    onClick={() => {
                        setWindowChat({});
                        handleLogout();
                    }}
                    className="border-l-[3px] hover:border-l-blue-600 border-[#fafafa] dark:hover:border-l-primary1 dark:hover:text-primary1 flex gap-4 items-center border-b-[1px] hover:text-blue-600 border-t-[1px]  py-3 cursor-pointer   px-3 hover:bg-slate-300 dark:border-gray-600/20 dark:text-primary5 dark:hover:bg-[#555]"
                >
                    <Tippy content={t("nav.logout")} placement="right">
                        <div className="">
                            <IoLogOut className="ml-5" />
                        </div>
                    </Tippy>
                    <span className="lg:hidden sm:inline-block"></span>
                    <h3 className="font-bold hidden lg:block">{t("nav.logout")}</h3>
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
