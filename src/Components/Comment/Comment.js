import React, { useContext, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ShowEmoji from "../ShowEmoji/ShowEmoji";
import { AuthContext } from "../../Context/AuthContextProvider";

function Comment({ authorPost }) {
    const [comment, setComment] = useState("");
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <div className="flex items-center gap-3 relative">
                <img src={currentUser.photoURL} className="w-[50px] h-[50px] object-cover rounded-[50%]" alt="" />
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    className="text-[1.6rem] flex-1 rounded-[20px] outline-none border-[2px] px-3 py-1"
                />
                <div className="cursor-pointer">
                    <AiOutlineSend className="text-[2.4rem]" />
                </div>
                <ShowEmoji setText={setComment} className="" />
            </div>
            <div className="py-4 flex flex-col gap-y-5">
                <div className="flex gap-3">
                    <img
                        src="https://source.unsplash.com/random"
                        className="w-[50px] h-[50px] object-cover rounded-[50%]"
                        alt=""
                    />
                    <div className="flex flex-col  rounded-[12px] px-3 bg-gray-300 py-2 w-[90%]">
                        <h2 className="text-[1.1rem] font-medium">Đoàn Hải Duy</h2>
                        <p className="text-[1.4rem]">
                            đây là commentđây là commentđây là commentđây là comment commentđây là commentđây là
                            commentđây là comment commentđây là commentđây là commentđây là comment commentđây là
                            commentđây là commentđây là comment commentđây là commentđây là commentđây là comment
                            commentđây là commentđây là commentđây là comment commentđây là commentđây là commentđây là
                            comment commentđây là commentđây là commentđây là comment commentđây là commentđây là
                            commentđây là comment commentđây là commentđây là commentđây là comment
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <img
                        src="https://source.unsplash.com/random"
                        className="w-[50px] h-[50px] object-cover rounded-[50%]"
                        alt=""
                    />
                    <div className="flex flex-col  rounded-[12px] px-3 bg-gray-300 py-2 w-[90%]">
                        <h2 className="text-[1.1rem] font-medium">Đoàn Hải Duy</h2>
                        <p className="text-[1.4rem]">
                            đây là commentđây là commentđây là commentđây là comment commentđây là commentđây là
                            commentđây là comment commentđây là commentđây là commentđây là comment commentđây là
                            commentđây là commentđây là comment commentđây là commentđây là commentđây là comment
                            commentđây là commentđây là commentđây là comment commentđây là commentđây là commentđây là
                            comment commentđây là commentđây là commentđây là comment commentđây là commentđây là
                            commentđây là comment commentđây là commentđây là commentđây là comment
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
