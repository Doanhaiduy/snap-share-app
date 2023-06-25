import { useContext } from "react";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { AuthContext } from "./Context/AuthContextProvider";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Protected from "./routes/Protected";
import Admin from "./pages/Admin/Admin";
import CreatePost from "./pages/CreatePost/CreatePost";
import Header from "./Components/Header/Header";
import NotFound from "./pages/NotFound/NotFound";
import { Spin } from "antd";
import { MultiLanguageContext } from "./Context/MultiLanguageContextProvider";
import Footer from "./Components/Footer/Footer";
import Theme from "./Components/Theme/Theme";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import Language from "./pages/Language/Language";
import Suggestions from "./Components/Suggestions/Suggestions ";

function App() {
    const { currentUser, isCurrentUser } = useContext(AuthContext);
    const { loading, setLoading, t } = useContext(MultiLanguageContext);

    return loading ? (
        <div className="flex justify-center items-center h-[100vh] text-[30px] bg-slate-200 dark:bg-primary2 dark:text-primary5">
            {t("loading")}... <Spin />
        </div>
    ) : (
        <BrowserRouter>
            <ToastContainer />
            <Theme />
            {!isCurrentUser && <Navigate to="/login" />}
            {isCurrentUser && <Header setLoading={setLoading} />}
            <div
                className={`${
                    isCurrentUser ? "grid" : null
                }  lg:grid-cols-5 grid-cols-6 gap-4 bg-slate-100 dark:bg-[#222]`}
            >
                {isCurrentUser && <Navbar />}
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<CreatePost />} path="/createPost" />
                    <Route
                        element={
                            <Protected currentUser={currentUser}>
                                <Auth />
                            </Protected>
                        }
                        path="/login"
                    />
                    <Route element={<Profile />} path="/profile/:uid/*" />
                    <Route element={<Admin />} path="/admin" />

                    <Route element={<NotFound />} path="*" />
                    <Route element={<Language />} path="/language" />
                </Routes>
                {isCurrentUser && window.location.pathname === "/" && <Suggestions />}
            </div>
            {!isCurrentUser && <Footer />}
        </BrowserRouter>
    );
}

export default App;
