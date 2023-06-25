import React, { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import "moment/min/locales";
import moment from "moment";

export const MultiLanguageContext = createContext();

function MultiLanguageContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const lang = JSON.parse(localStorage.getItem("language"));
    useEffect(() => {
        switch (lang) {
            case "vi":
                moment.locale("vi");
                break;
            case "en":
                moment.locale("en-US");
                break;
            case "ko":
                moment.locale("ko");
                break;
            case "fr":
                moment.locale("fr-ca");
                break;
            case "th":
                moment.locale("th");
                break;
            case "tw":
                moment.locale("zh-tw");
                break;
            default:
                break;
        }
    }, [lang]);
    const handleChangeLanguage = (key) => {
        setLoading(true);
        setTimeout(() => {
            i18n.changeLanguage(key);
            localStorage.setItem("language", JSON.stringify(key));
            switch (lang) {
                case "vi":
                    moment.locale("vi");
                    break;
                case "en":
                    moment.locale("en-US");
                    break;
                case "ko":
                    moment.locale("ko");
                    break;
                case "fr":
                    moment.locale("fr-ca");
                    break;
                case "th":
                    moment.locale("th");
                    break;
                case "tw":
                    moment.locale("zh-tw");
                    break;
                default:
                    break;
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <MultiLanguageContext.Provider value={{ loading, handleChangeLanguage, t }}>
            {children}
        </MultiLanguageContext.Provider>
    );
}

export default MultiLanguageContextProvider;
