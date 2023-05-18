import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import NewsFeed from "../../Components/NewsFeed/NewsFeed";
import { ProfileContext } from "../../Context/ProfileContextProvider";
import { FaPlus } from "react-icons/fa";
import Search from "../../Components/Search/Search";

function Home() {
    const { currentUser, userInfo } = useContext(AuthContext);
    const { currentProfile, setCurrentProfile } = useContext(ProfileContext);
    const handleLogout = () => {
        signOut(auth);
    };
    return (
        <>
            <div className="p-[20px] flex justify-between gap-5 px-[100px]">
                <div className="flex items-center gap-x-5" aria-label="button-combination">
                    <Link
                        onClick={() => {
                            setCurrentProfile(userInfo);
                            localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                        }}
                        to={`/profile/${currentUser?.uid}`}
                        className="inline-flex items-center justify-center px-8 py-4 hover:opacity-90 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                    >
                        Profile
                    </Link>
                    <Link
                        to="/postImage"
                        className="inline-flex gap-3 items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 transition-colors duration-300 rounded-lg h-[60px]"
                    >
                        <FaPlus />
                        Post Image
                    </Link>
                </div>
                <Search />
                <Link
                    to="/admin"
                    className="inline-flex items-center justify-center px-8 py-4 hover:opacity-90  font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                >
                    Admin
                </Link>
                <button
                    className="inline-flex items-center justify-center px-8 py-4 hover:opacity-90  font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <NewsFeed />
        </>
    );
}

export default Home;
