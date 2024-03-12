import CreatePost2 from './Components/CreatePost2/CreatePost2';
import { useContext } from 'react';
import '~/App.css';
import { AuthContext } from '~/Context/AuthContextProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from '~/routes/Protected';
import { Spin } from 'antd';
import { MultiLanguageContext } from '~/Context/MultiLanguageContextProvider';
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout';
import { publicRoutes, privateRoutes } from '~/routes';
import Test1 from './Components/Test1/Test1';
import ShowImage from './Components/ShowImage/ShowImage';
function App() {
    const { currentUser } = useContext(AuthContext);
    const { loading, t } = useContext(MultiLanguageContext);
    return loading ? (
        <div className='flex justify-center items-center h-[100vh] text-[30px] bg-slate-200 dark:bg-primary2 dark:text-primary5'>
            {t('loading')}... <Spin />
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
                    {/* <Route element={<CreatePost2 />} path="/testCreate" /> */}
                    {/* <Route element={<ShowImage />} path="/image" /> */}
                    {/* <Route element={<Test1 />} path="/testCreate" /> */}
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
