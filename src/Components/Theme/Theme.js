import React, { useContext } from "react";
import { ThemeContext } from "~/Context/ThemeContextProvider";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
export default function Theme() {
    const { darkToggle, setDarkToggle } = useContext(ThemeContext);
    const { t } = useContext(MultiLanguageContext);
    return (
        <div className={`${darkToggle && "dark"}`}>
            <label className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    defaultValue
                    className="sr-only peer"
                    checked={darkToggle}
                    onChange={() => {
                        setDarkToggle(!darkToggle);
                        localStorage.setItem("dark", JSON.stringify(!darkToggle));
                    }}
                />

                <span className="p-3 text-sm font-medium text-gray-900 dark:text-primary5  ">
                    {darkToggle ? (
                        <DarkModeIcon className="text-primary1" />
                    ) : (
                        <LightModeIcon className="text-blue-600" />
                    )}
                </span>
            </label>
        </div>
    );
}
