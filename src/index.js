import React from "react";
import ReactDOM from "react-dom/client";
import "~/index.css";
import App from "~/App";
import reportWebVitals from "~/reportWebVitals";
import GlobalStyles from "~/Components/GlobalStyles/GlobalStyles";
import AuthContextProvider from "~/Context/AuthContextProvider";
import ProfileContextProvider from "~/Context/ProfileContextProvider";
import MultiLanguageContextProvider from "~/Context/MultiLanguageContextProvider";
import ThemeContextProvider from "~/Context/ThemeContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeContextProvider>
        <MultiLanguageContextProvider>
            <AuthContextProvider>
                <ProfileContextProvider>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </ProfileContextProvider>
            </AuthContextProvider>
        </MultiLanguageContextProvider>
    </ThemeContextProvider>
);

reportWebVitals();
