import React, { useContext } from "react";
import { AiFillClockCircle, AiFillEnvironment, AiFillSignal, AiOutlineGlobal } from "react-icons/ai";
import Hobby from "../../Components/Hooby/Hobby";
import { format } from "date-fns";
import { MultiLanguageContext } from "../../Context/MultiLanguageContextProvider";
import { enUS, fr, vi, th, ko, zhTW } from "date-fns/esm/locale";

function About({ userRender, isCurrent, handleShowModal }) {
    const { t } = useContext(MultiLanguageContext);
    const handleGetLocal = (lang) => {
        switch (lang) {
            case "vi":
                return {
                    locale: vi,
                };
            case "en":
                return {
                    locale: enUS,
                };
            case "ko":
                return {
                    locale: ko,
                };
            case "fr":
                return {
                    locale: fr,
                };
            case "tw":
                return {
                    locale: zhTW,
                };
            case "th":
                return {
                    locale: th,
                };
            default:
                return;
        }
    };
    return (
        <div className="mt-2 col-span-1 dark:bg-[#282828] bg-white p-5 rounded-[12px] lg:w-full sm:w-[80%] w-full mx-auto">
            <h2 className="font-semibold text-[20px]">{t("about.aboutMe")}</h2>
            <p
                className="text-[1rem] text-center border-b-[1px] border-[#555] pb-3 mt-[16px]"
                dangerouslySetInnerHTML={{ __html: userRender?.bio }}
            ></p>
            <div className="pt-3">
                <ul className="flex flex-col gap-4 text-[18px]">
                    <li className="flex items-center gap-2">
                        <AiFillEnvironment /> {t("about.livesIn")} {userRender?.address || "Nha Trang"}
                    </li>
                    <li className="flex items-center gap-2">
                        <AiFillClockCircle /> {t("about.joined")}{" "}
                        {format(
                            new Date(userRender?.joinDate),
                            "MMMM yyyy",
                            handleGetLocal(JSON.parse(localStorage.getItem("language")))
                        )}
                    </li>
                    <li className="flex items-center gap-2">
                        <AiFillSignal /> {t("about.followedBy")} 509,266
                    </li>
                    {userRender?.website && (
                        <li className="flex items-center gap-2 break-words">
                            <AiOutlineGlobal className="min-w-[18px]" />
                            <a
                                target="_blank"
                                href={userRender?.website}
                                className="break-words line-clamp-1"
                                rel="noreferrer"
                            >
                                {userRender?.website}
                            </a>
                        </li>
                    )}
                </ul>
            </div>
            {isCurrent && (
                <div
                    className="my-[20px] text-center text-[18px] font-semibold bg-blue-600 dark:bg-primary1 dark:text-primary2 dark:hover:bg-yellow-600 dark:hover:text-gray-800 hover:bg-blue-700 rounded-[4px] py-1 cursor-pointer text-primary4"
                    onClick={() => {
                        handleShowModal();
                    }}
                >
                    {t("about.editDetails")}
                </div>
            )}

            <div className="my-[20px] font-semibold flex flex-wrap gap-2 text-center ">
                <Hobby t={t} />
                <Hobby t={t} />
                <Hobby t={t} />
                <Hobby t={t} />
                <Hobby t={t} />
            </div>
        </div>
    );
}

export default About;
