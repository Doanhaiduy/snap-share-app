import React, { useContext } from "react";
import RequestItem from "./RequestItem";
import { MultiLanguageContext } from "../../Context/MultiLanguageContextProvider";

function Request({ isMobile }) {
    const { t } = useContext(MultiLanguageContext);

    return (
        <div className={`${!isMobile && "lg:block hidden"}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold uppercase text-gray-500 ">{t("suggestion.request.title")}</h3>
                <span className="flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-full text-white">
                    <span className="text-sm">2</span>
                </span>
            </div>
            <div className=" flex flex-col gap-3 ">
                <RequestItem t={t} />
                <RequestItem t={t} />
            </div>
        </div>
    );
}

export default Request;
