import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import NewsFeed from "../../Components/NewsFeed/NewsFeed";
import { ProfileContext } from "../../Context/ProfileContextProvider";

function Home() {
    const { currentUser, userInfo } = useContext(AuthContext);
    const { currentProfile, setCurrentProfile } = useContext(ProfileContext);
    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div className=" ">
            <Link
                onClick={() => {
                    setCurrentProfile(userInfo);
                    localStorage.setItem("currentProfile", JSON.stringify(userInfo));
                }}
                to={`/profile/${currentUser?.uid}`}
                className="py-2 text-2xl text-white font-medium bg-blue-600 w-1/3 flex items-center justify-center hover:opacity-90 mx-auto rounded-lg mt-2"
            >
                Profile
            </Link>
            <Link
                to="/postImage"
                className="py-2 text-2xl text-white font-medium bg-blue-600 w-1/3 flex items-center justify-center hover:opacity-90 mx-auto rounded-lg mt-2"
            >
                Post Image
            </Link>
            <button
                className="py-2 text-2xl text-white font-medium bg-blue-600 w-1/3 flex items-center justify-center hover:opacity-90 mx-auto rounded-lg mt-2"
                onClick={handleLogout}
            >
                Logout
            </button>
            <NewsFeed />
        </div>
    );
}

export default Home;
