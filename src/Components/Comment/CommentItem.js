import React, { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase-config";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import { Link } from "react-router-dom";
import { AuthContext } from "~/Context/AuthContextProvider";
import { toast } from "react-toastify";
import { BsFillCheckCircleFill } from "react-icons/bs";
import moment from "moment";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import { ThemeContext } from "~/Context/ThemeContextProvider";

const CommentItem = React.memo(({ data }) => {
    const [authorComment, setAuthorComment] = useState({});
    const { setCurrentProfile } = useContext(ProfileContext);
    const { t } = useContext(MultiLanguageContext);
    const { darkToggle } = useContext(ThemeContext);

    const { currentUser } = useContext(AuthContext);
    const [showOption, setShowOption] = useState(false);
    const textRef = useRef();
    const getAuthorComment = useCallback(async (uid) => {
        const docRef = doc(db, "users", uid);
        const userDoc = await getDoc(docRef);
        setAuthorComment(userDoc.data());
    }, []);
    if (textRef.current) {
        textRef.current.onclick = (e) => {
            if (e.target.tagName === "P") {
                return;
            } else {
                setShowOption(false);
            }
        };
    }

    const handleDeleteComment = async () => {
        try {
            await deleteDoc(doc(db, "comments", data.uid));
            await toast.success(t("comment.toast-1"), {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: darkToggle ? "dark" : "light",
            });
        } catch (error) {
            console.log("Lỗi khi xóa comment:", error);
        }
    };
    useEffect(() => {
        getAuthorComment(data.uidUser);
    }, [data.uidUser, getAuthorComment]);
    return (
        <div className="flex gap-3" ref={textRef}>
            <Link
                to={`/profile/${authorComment?.nameId || authorComment?.uid}`}
                onClick={() => {
                    localStorage.setItem("currentProfile", JSON.stringify(authorComment));
                    setCurrentProfile(authorComment);
                }}
            >
                <img
                    src={authorComment?.photoURL}
                    className="w-[50px] h-[50px] object-cover rounded-[50%] cursor-pointer"
                    alt=""
                />
            </Link>
            <div className="flex flex-col  rounded-[12px] px-3 bg-gray-300 dark:bg-primary2 py-2 w-[90%]">
                <div className="text-[12px] font-medium relative">
                    {moment().diff(data.releaseDate, "days") > 30
                        ? data.releaseDate
                        : moment(data.releaseDate).fromNow()}
                    <span
                        className="ml-[12px] select-none font-bold text-[2rem] right-0 absolute top-[-24px] cursor-pointer"
                        onClick={(e) => {
                            setShowOption(!showOption);
                        }}
                    >
                        ...
                    </span>
                    {showOption && (
                        <div className="absolute right-[10px] bg-white dark:bg-[#282828] rounded-[12px] overflow-hidden font-semibold cursor-pointer">
                            {(data.uidUser === currentUser.uid ||
                                currentUser.uid === "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2") && (
                                <>
                                    <p
                                        className="text-[1.1rem] py-1 px-2 hover:bg-slate-500 hover:text-white "
                                        onClick={handleDeleteComment}
                                    >
                                        {t("comment.delete")}
                                    </p>
                                    <p className="text-[1.1rem] py-1 px-2 hover:bg-slate-500 hover:text-white ">
                                        {t("comment.edit")}
                                    </p>
                                </>
                            )}
                            <p className="text-[1.1rem] py-1 px-2 hover:bg-slate-500 hover:text-white ">
                                {t("comment.report")}
                            </p>
                        </div>
                    )}
                </div>
                <h2 className="text-[1.1rem] font-medium">
                    {authorComment?.name}
                    {authorComment.verified && (
                        <BsFillCheckCircleFill className="text-[14px] inline text-[#5890ff] dark:text-primary1  ml-[6px] mb-[4px]" />
                    )}
                </h2>
                <div className="text-[1.4rem]">{data.text}</div>
                {data.img && <img src={data.img} alt="" className="w-[300px] h-auto rounded-[12px] mt-5" />}
                {data.gif && <img src={data.gif} alt="" className="w-[200px] h-auto rounded-[12px] mt-5" />}
            </div>
        </div>
    );
});

export default memo(CommentItem);
