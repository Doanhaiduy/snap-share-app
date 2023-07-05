import { useContext } from "react";
import "~/App.css";
import Auth from "~/Components/Auth/Auth";
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";
import { AuthContext } from "~/Context/AuthContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "~/routes/Protected";
import Admin from "~/pages/Admin/Admin";
import CreatePost from "~/pages/CreatePost/CreatePost";
import NotFound from "~/pages/NotFound/NotFound";
import { Spin } from "antd";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import Language from "~/pages/Language/Language";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";

function App() {
    const { currentUser } = useContext(AuthContext);
    const { loading, t } = useContext(MultiLanguageContext);
    return loading ? (
        <div className="flex justify-center items-center h-[100vh] text-[30px] bg-slate-200 dark:bg-primary2 dark:text-primary5">
            {t("loading")}... <Spin />
        </div>
    ) : (
        <BrowserRouter>
            <DefaultLayout>
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
                    <Route element={<Language />} path="/language" />
                    <Route element={<NotFound />} path="*" />
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
