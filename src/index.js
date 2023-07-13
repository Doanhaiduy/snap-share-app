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
import ChatsContextProvider from "./Context/ChatsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeContextProvider>
        <MultiLanguageContextProvider>
            <AuthContextProvider>
                <ChatsContextProvider>
                    <ProfileContextProvider>
                        <GlobalStyles>
                            <App />
                        </GlobalStyles>
                    </ProfileContextProvider>
                </ChatsContextProvider>
            </AuthContextProvider>
        </MultiLanguageContextProvider>
    </ThemeContextProvider>
);

reportWebVitals();
