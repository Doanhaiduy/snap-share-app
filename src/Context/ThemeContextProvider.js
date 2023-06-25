import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
    const [darkToggle, setDarkToggle] = useState(() => {
        if (!!JSON.parse(localStorage.getItem("dark"))) {
            return JSON.parse(localStorage.getItem("dark"));
        } else {
            return false;
        }
    });

    return (
        <ThemeContext.Provider value={{ setDarkToggle, darkToggle }}>
            <div className={`${darkToggle && "dark"} min-h-[100vh] bg-slate-200 dark:bg-primary2 dark:text-primary5`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;
