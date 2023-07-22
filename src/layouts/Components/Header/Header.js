import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "~/Context/AuthContextProvider";
import Search from "~/Components/Search/Search";
import logo from "~/assets/imgs/Logo.png";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "tippy.js/dist/tippy.css"; // optional
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import CreatePost from "~/Components/CreatePost/CreatePost";
import Notification from "~/Components/Notification/Notification";

function Header() {
    const { userInfo } = useContext(AuthContext);
    const { t } = useContext(MultiLanguageContext);
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
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
                    <div
                        onClick={() => {
                            setShowModal(true);
                        }}
                        className="text-[14px] sm:flex hidden gap-1 items-center cursor-pointer hover:opacity-90 h-[40px] px-3 text-white font-medium rounded-[12px] bg-blue-600  dark:text-primary2 dark:bg-primary1"
                    >
                        <AiOutlinePlusSquare className="text-[20px]" /> {t("create")}
                    </div>
                    <Notification showNotification={showNotification} setShowNotification={setShowNotification} />
                </div>
            </div>
            {showModal && <CreatePost handleCloseModal={handleCloseModal} />}
        </div>
    );
}
export default Header;
