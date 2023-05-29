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

function App() {
    const { currentUser, isCurrentUser } = useContext(AuthContext);

    return (
        <BrowserRouter>
            {!isCurrentUser && <Navigate to="/login" />}
            {isCurrentUser && <Header />}

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
                <Route element={<Profile />} path="/profile/:uid" />
                <Route element={<Admin />} path="/admin" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
