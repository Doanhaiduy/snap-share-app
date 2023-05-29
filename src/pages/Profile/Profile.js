import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import SettingProfile from "./SettingProfile";
import ListPost from "../../Components/ListPost/ListPost";
import { toast } from "react-toastify";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillEdit, AiOutlineUserAdd } from "react-icons/ai";

function Profile() {
    const { currentUser, userInfo, getUserInfo } = useContext(AuthContext);
    const userRender = JSON.parse(localStorage.getItem("currentProfile")) || userInfo;
    const [isShowModal, setIsShowModal] = useState(false);

    const handleShowModal = () => {
        setIsShowModal(true);
    };
    const handleCloseModal = () => {
        setIsShowModal(false);
    };
    const handleUpdateSuccess = async () => {
        await toast.success("Success! Your changes have been saved.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    return (
        <div className="p-[16px]  bg-slate-200 pt-[90px] ">
            {isShowModal ? (
                <SettingProfile
                    handleCloseModal={handleCloseModal}
                    userInfo={userRender}
                    getUserInfo={getUserInfo}
                    handleUpdateSuccess={handleUpdateSuccess}
                />
            ) : null}
            <div className=" flex flex-col items-center relative">
                <div className="absolute right-2 top-2">
                    {userRender?.uid === currentUser?.uid ? (
                        <h3
                            className=" flex items-center gap-2 font-medium border-4  px-2 py-1 rounded-[12px] cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                            onClick={handleShowModal}
                        >
                            <AiFillEdit />
                            Update Profile
                        </h3>
                    ) : (
                        <h3 className=" flex items-center gap-2 font-medium border-4  px-2 py-1 rounded-[12px] cursor-pointer hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors">
                            <AiOutlineUserAdd />
                            Add Friend
                        </h3>
                    )}
                </div>
                <div
                    className="bg-cover bg-center w-full h-[500px] bg-blue-700 rounded-[18px]"
                    style={{ backgroundImage: `url('${userRender.coverImg}')` }}
                ></div>

                <div className="">
                    <img
                        src={userRender?.photoURL}
                        alt=""
                        className="w-[240px] h-[240px] rounded-full  object-cover  relative translate-y-[-120px] z-[9]"
                    />
                </div>
                <div className="mt-2 translate-y-[-120px]">
                    <h2 className="text-[3rem] font-bold text-center ">
                        {userRender?.name}{" "}
                        {userRender.verified && (
                            <div className="inline relative group">
                                <BsFillCheckCircleFill className="text-[18px] inline text-[#5890ff] ml-[-6px] mt-[4px] cursor-pointer"></BsFillCheckCircleFill>
                                <p className="text-[16px] w-[330px] text-gray-700 font-[500] text-left shadow-2xl group-hover:block hidden absolute p-3 bg-[#fff] rounded-[6px] top-[-30px] right-[-330px]">
                                    SnapShare đã xác nhận trang cá nhân này là thật - Nạp 100k để được sở hữu nó
                                </p>
                            </div>
                        )}
                    </h2>

                    <p className="text-[1.6rem] text-center" dangerouslySetInnerHTML={{ __html: userRender?.bio }}></p>
                </div>
            </div>
            <div className="">
                <h2 className="text-[3rem] font-bold mb-8">Posts:</h2>
                <ListPost userRender={userRender} />
            </div>
        </div>
    );
}

export default Profile;
