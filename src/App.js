import { useContext } from "react";
import "~/App.css";
import { AuthContext } from "~/Context/AuthContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "~/routes/Protected";
import { Spin } from "antd";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import { publicRoutes, privateRoutes } from "~/routes";
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
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page title={route.title} />} />;
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Protected currentUser={currentUser}>
                                        <Page title={route.title} />
                                    </Protected>
                                }
                            />
                        );
                    })}
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
