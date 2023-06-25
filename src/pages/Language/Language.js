import React, { useContext } from "react";
import { MultiLanguageContext } from "../../Context/MultiLanguageContextProvider";

function Language(props) {
    const { t, handleChangeLanguage } = useContext(MultiLanguageContext);
    const lang = JSON.parse(localStorage.getItem("language"));
    return (
        <div className="lg:col-span-4 col-span-5 pt-[80px] min-h-[100vh] dark:text-primary5">
            <h2 className="font-semibold text-[2rem] mb-5">Choose Language</h2>
            <nav className=" grid lg:grid-cols-5 sm:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 p-4">
                <div className="px-5 py-2 bg-blue-600 line-clamp-1 dark:bg-primary1 dark:hover:bg-yellow-500 rounded-[4px]  hover:bg-blue-700 ">
                    <p
                        className={`cursor-pointer text-base leading-6 text-white  dark:text-primary2  font-semibold ${
                            lang === "vi" ? "pointer-events-none opacity-60 select-none" : null
                        } `}
                        onClick={() => handleChangeLanguage("vi")}
                    >
                        Tiếng Việt
                    </p>
                </div>
                <div className="px-5 py-2 bg-blue-600 line-clamp-1 dark:bg-primary1 dark:hover:bg-yellow-500 rounded-[4px]   hover:bg-blue-700">
                    <p
                        className={`cursor-pointer text-base  leading-6 text-white  dark:text-primary2  font-semibold ${
                            lang === "en" ? "pointer-events-none opacity-60 select-none" : null
                        } `}
                        onClick={() => handleChangeLanguage("en")}
                    >
                        English (US)
                    </p>
                </div>
                <div className="px-5 py-2 bg-blue-600 line-clamp-1 dark:bg-primary1 dark:hover:bg-yellow-500 rounded-[4px]  hover:bg-blue-700 ">
                    <p
                        className={`cursor-pointer text-base leading-6 text-white  dark:text-primary2  font-semibold ${
                            lang === "ko" ? "pointer-events-none opacity-60 select-none" : null
                        } `}
                        onClick={() => handleChangeLanguage("ko")}
                    >
                        한국어
                    </p>
                </div>
                <div className="px-5 py-2 bg-blue-600 line-clamp-1 dark:bg-primary1 dark:hover:bg-yellow-500 rounded-[4px]  hover:bg-blue-700 ">
                    <p
                        className={`cursor-pointer text-base leading-6 text-white  dark:text-primary2 line-clamp-1  font-semibold ${
                            lang === "fr" ? "pointer-events-none opacity-60 select-none" : null
                        } `}
                        onClick={() => handleChangeLanguage("fr")}
                    >
                        Français (France)
                    </p>
                </div>
                <div className="px-5 py-2 bg-blue-600 line-clamp-1 dark:bg-primary1 dark:hover:bg-yellow-500 rounded-[4px]  hover:bg-blue-700 ">
                    <p
                        className={`cursor-pointer text-base leading-6 text-white  dark:text-primary2  font-semibold ${
                            lang === "th" ? "pointer-events-none opacity-60 select-none" : null
                        } `}
                        onClick={() => handleChangeLanguage("th")}
                    >
                        ภาษาไทย
                    </p>
                </div>
                <div className="px-5 py-2 bg-blue-600 line-clamp-1 dark:bg-primary1 dark:hover:bg-yellow-500 rounded-[4px]  hover:bg-blue-700 ">
                    <p
                        className={`cursor-pointer text-base leading-6 text-white  dark:text-primary2  font-semibold ${
                            lang === "tw" ? "pointer-events-none opacity-60 select-none" : null
                        } `}
                        onClick={() => handleChangeLanguage("tw")}
                    >
                        中文(台灣)
                    </p>
                </div>
            </nav>
        </div>
    );
}

export default Language;
