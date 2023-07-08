import React, { useContext } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import Suggestions from "../Components/Suggestions/Suggestions ";
import MoreAction from "../Components/MoreAction/MoreAction";
import Header from "../Components/Header/Header";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const DefaultLayout = ({ children }) => {
    const { isCurrentUser } = useContext(AuthContext);
    const { setLoading } = useContext(MultiLanguageContext);

    return (
        <div>
            <ToastContainer />
            {!isCurrentUser && <Navigate to="/login" />}
            {isCurrentUser && <Header setLoading={setLoading} />}
            <div
                className={`${
                    isCurrentUser ? "grid" : null
                }  lg:grid-cols-5 grid-cols-6 gap-4 bg-slate-100 dark:bg-[#222]`}
            >
                {isCurrentUser && <Navbar />}
                {children}
                {isCurrentUser && window.location.pathname === "/" && <Suggestions />}
            </div>
            {!isCurrentUser && <Footer />}
            <MoreAction />
        </div>
    );
};

export default DefaultLayout;
