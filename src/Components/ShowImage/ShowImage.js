import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import { v4 } from "uuid";

function ShowImage({ imgs }) {
    const [showModal, setShowModal] = useState(false);
    const [indexImg, setIndexImg] = useState(0);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleLeftBtn = () => {
        if (indexImg === 0) {
            setIndexImg(imgs.length - 1);
        } else {
            setIndexImg((pre) => pre - 1);
        }
    };
    const handleRightBtn = () => {
        if (indexImg === imgs.length - 1) {
            setIndexImg(0);
        } else {
            setIndexImg((pre) => pre + 1);
        }
    };
    return (
        <div className="mt-4">
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[9999999] outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto px-4">
                            <img
                                src={imgs[indexImg]}
                                className="h-[80vh] object-cover rounded-[8px] shadow-xl"
                                alt=""
                            />
                        </div>
                        <div className="absolute top-[40px] right-[40px] text-[30px] cursor-pointer text-gray-300">
                            <AiOutlineClose onClick={() => setShowModal(false)} />
                        </div>
                        {imgs.length > 1 && (
                            <div className="absolute flex justify-between w-full px-5 text-[60px] text-gray-300">
                                <BiCaretLeft className="cursor-pointer" onClick={handleLeftBtn} />
                                <BiCaretRight className="cursor-pointer" onClick={handleRightBtn} />
                            </div>
                        )}
                    </div>
                    <div className="opacity-90 fixed inset-0 z-[999999] bg-black"></div>
                </>
            ) : null}
            {imgs?.length === 1 && (
                <div className=" w-[full] grid grid-cols-1 gap-1 " onClick={handleShowModal}>
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(0)}
                        src={imgs[0]}
                        alt=""
                    />
                </div>
            )}
            {imgs?.length === 2 && (
                <div className=" w-[full]  grid grid-cols-2 gap-1 " onClick={handleShowModal}>
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(0)}
                        src={imgs[0]}
                        alt=""
                    />
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(1)}
                        src={imgs[1]}
                        alt=""
                    />
                </div>
            )}
            {imgs?.length === 3 && (
                <div className=" w-[full]  grid grid-cols-3 gap-1 " onClick={handleShowModal}>
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(0)}
                        src={imgs[0]}
                        alt=""
                    />
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover mt-[20px]"
                        onClick={() => setIndexImg(1)}
                        src={imgs[1]}
                        alt=""
                    />
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(2)}
                        src={imgs[2]}
                        alt=""
                    />
                </div>
            )}
            {imgs?.length === 4 && (
                <div className=" w-[full]  grid grid-cols-4 gap-1 " onClick={handleShowModal}>
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(0)}
                        src={imgs[0]}
                        alt=""
                    />
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover mt-[20px]"
                        onClick={() => setIndexImg(1)}
                        src={imgs[1]}
                        alt=""
                    />
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(2)}
                        src={imgs[2]}
                        alt=""
                    />
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full mt-[20px] object-cover"
                        onClick={() => setIndexImg(3)}
                        src={imgs[3]}
                        alt=""
                    />
                </div>
            )}
            {imgs?.length > 4 && (
                <div className=" w-[full]  grid grid-cols-4 gap-1 " onClick={handleShowModal}>
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(0)}
                        src={imgs[0]}
                        alt=""
                    />
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover mt-[20px]"
                        onClick={() => setIndexImg(1)}
                        src={imgs[1]}
                        alt=""
                    />
                    <img
                        className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                        onClick={() => setIndexImg(2)}
                        src={imgs[2]}
                        alt=""
                    />
                    <div className="relative">
                        <img
                            className="cursor-pointer rounded-[12px] h-[400px] w-full mt-[20px] object-cover brightness-50"
                            onClick={() => setIndexImg(3)}
                            src={imgs[3]}
                            alt=""
                        />
                        <span className="cursor-pointer absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-semibold text-gray-200 text-[24px]">
                            +{imgs?.length - 3}
                        </span>
                    </div>
                </div>
            )}
            {/* <div
                className={`w-[full]  grid grid-cols-4 gap-1 ${imgs.length <= 3 && "grid-cols-" + imgs.length}`}
                onClick={handleShowModal}
            >
                {imgs.map((item, index) => {
                    if (index === 1) {
                        if (imgs.length === 2) {
                            return (
                                <img
                                    className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover "
                                    onClick={() => setIndexImg(index)}
                                    src={item}
                                    key={v4()}
                                    alt=""
                                />
                            );
                        } else {
                            return (
                                <img
                                    className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover mt-[20px]"
                                    onClick={() => setIndexImg(index)}
                                    src={item}
                                    key={v4()}
                                    alt=""
                                />
                            );
                        }
                    }
                    if (index === 3) {
                        if (imgs.length === 4) {
                            return (
                                <img
                                    className="cursor-pointer rounded-[12px] h-[400px] w-full mt-[20px] object-cover"
                                    onClick={() => setIndexImg(index)}
                                    src={item}
                                    key={v4()}
                                    alt=""
                                />
                            );
                        } else {
                            return (
                                <div className="relative">
                                    <img
                                        className="cursor-pointer rounded-[12px] h-[400px] w-full mt-[20px] object-cover brightness-50"
                                        onClick={() => setIndexImg(index)}
                                        src={item}
                                        key={v4()}
                                        alt=""
                                    />
                                    <span className="cursor-pointer absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] font-semibold text-gray-200 text-[24px]">
                                        +{imgs?.length - 3}
                                    </span>
                                </div>
                            );
                        }
                    }
                    if (index > 3) {
                        return null;
                    }
                    return (
                        <img
                            className="cursor-pointer rounded-[12px] h-[400px] w-full object-cover"
                            onClick={() => setIndexImg(index)}
                            src={item}
                            alt=""
                            key={v4()}
                        />
                    );
                })}
            </div> */}
        </div>
    );
}

export default ShowImage;
