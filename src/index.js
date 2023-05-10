import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./Components/GlobalStyles/GlobalStyles";
import AuthContextProvider from "./Context/AuthContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </AuthContextProvider>
);

reportWebVitals();
