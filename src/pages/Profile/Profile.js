import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import SettingProfile from "./SettingProfile";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ListPost from "../../Components/ListPost/ListPost";

function Profile() {
    const { currentUser, userInfo, getUserInfo } = useContext(AuthContext);
    const [isShowModal, setIsShowModal] = useState(false);

    const handleShowModal = () => {
        setIsShowModal(true);
    };
    const handleCloseModal = () => {
        setIsShowModal(false);
    };
    return (
        <div className="p-[16px] relative ">
            <div className="flex justify-between items-center">
                <Link
                    to="/"
                    className="text-[1.5rem] inline-flex items-center gap-3 py-3 px-4 bg-blue-600 rounded-[12px] text-white cursor-pointer hover:opacity-90"
                >
                    <FaArrowAltCircleLeft />
                    Home
                </Link>
                <h2 className="text-[3rem] font-medium text-center">Profile</h2>
                <h3
                    className=" inline px-3 py-1 hover:opacity-90 cursor-pointer bg-blue-600 text-white rounded-[6px] text-[1.8rem]"
                    onClick={handleShowModal}
                >
                    Edit Profile
                </h3>
            </div>
            {isShowModal ? (
                <SettingProfile handleCloseModal={handleCloseModal} userInfo={userInfo} getUserInfo={getUserInfo} />
            ) : null}
            <div className=" flex flex-col items-center">
                <div
                    className="bg-cover bg-center w-full h-[500px] bg-blue-700 rounded-[18px]"
                    style={{ backgroundImage: `url('${userInfo.coverImg}')` }}
                ></div>

                <div className="">
                    <img
                        src={userInfo?.photoURL}
                        alt=""
                        className="w-[240px] h-[240px] rounded-full object-cover  relative translate-y-[-120px] z-[9]"
                    />
                </div>
                <div className="mt-2 translate-y-[-120px]">
                    <h2 className="text-[3rem] font-bold text-center">{userInfo?.name}</h2>
                    <p className="text-[1.6rem] text-center">{userInfo?.bio}</p>
                </div>
            </div>
            <div className="">
                <h2 className="text-[3rem] font-bold">Image:</h2>
                <ListPost />
            </div>
        </div>
    );
}

export default Profile;
