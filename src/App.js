import { useContext } from "react";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import { AuthContext } from "./Context/AuthContextProvider";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Protected from "./routes/Protected";
import PostImage from "./pages/PostImage/PostImage";

function App() {
    const { currentUser, isCurrentUser } = useContext(AuthContext);
    return (
        <BrowserRouter>
            {!isCurrentUser && <Navigate to="/login" />}
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<PostImage />} path="/postImage" />
                <Route
                    element={
                        <Protected currentUser={currentUser}>
                            <Auth />
                        </Protected>
                    }
                    path="/login"
                />
                <Route element={<Profile />} path="/Profile" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
