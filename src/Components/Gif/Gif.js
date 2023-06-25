import React, { useContext, useState } from "react";
import { RiFileGifFill } from "react-icons/ri";
import HeadLess from "@tippyjs/react/headless";
import { MultiLanguageContext } from "../../Context/MultiLanguageContextProvider";

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context("../../assets/gifs", false, /\.(png|jpe?g|svg|gif)$/));
function Gif({ handlePostGif }) {
    const { t } = useContext(MultiLanguageContext);

    const [showGif, setShowGif] = useState(false);
    return (
        <div className="">
            <HeadLess
                visible={showGif}
                interactive
                render={() => (
                    <div className="rounded-[4px] bg-white dark:bg-primary2  shadow-lg relative">
                        <span className="font-bold p-2 text-gray-500 inline-block uppercase dark:text-primary5 ">
                            {t("gif")}
                        </span>
                        <div className="flex items-center  justify-center flex-wrap w-[250px] h-[400px] gap-2 pb-[12px]  overflow-y-auto px-[4px] ">
                            {images.map((item, index) => (
                                <div className="cursor-pointer" key={index} onClick={() => handlePostGif(item)}>
                                    <img src={item} className="w-[40px] object-cover " alt="GIF" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                onClickOutside={() => setShowGif(false)}
            >
                <div className="relative">
                    <RiFileGifFill className="text-[36px] cursor-pointer" onClick={() => setShowGif(!showGif)} />
                </div>
            </HeadLess>
        </div>
    );
}

export default Gif;
