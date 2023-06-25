import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageEN from "./locales/en/en.json";
import languageVI from "./locales/vi/vi.json";
import languageKO from "./locales/ko/ko.json";
import languageFR from "./locales/fr/fr.json";
import languageTH from "./locales/th/th.json";
import languageTW from "./locales/tw/tw.json";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: languageEN,
            },
            vi: {
                translation: languageVI,
            },
            ko: {
                translation: languageKO,
            },
            fr: {
                translation: languageFR,
            },
            th: {
                translation: languageTH,
            },
            tw: {
                translation: languageTW,
            },
        },
        lng: JSON.parse(localStorage.getItem("language")) || "en", // if you're using a language detector, do not define the lng option
        fallbackLng: JSON.parse(localStorage.getItem("language")) || "en    ",

        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
    });

export default i18n;
