import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContextProvider";

export default function Theme() {
    const { darkToggle, setDarkToggle } = useContext(ThemeContext);
    return (
        <div className={`${darkToggle && "dark"} z-[100] inline fixed right-6 bottom-6`}>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
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
                <div className="w-9 h-5 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-primary5 ">
                    {darkToggle ? "Light" : "Dark"}
                </span>
            </label>
        </div>
    );
}
