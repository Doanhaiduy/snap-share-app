import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import ItemUserManager from "../../Components/ItemUserManger/ItemUserManager";
import { Spin } from "antd";

function Admin() {
    const [users, setUsers] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser?.uid !== "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2" && window.location.hostname !== "localhost") {
            return;
        }
        getUser();
    }, [currentUser?.uid]);

    const getUser = async () => {
        setLoading(true);
        try {
            const usersRef = collection(db, "users");
            let q = query(usersRef, orderBy("joinDate", "desc"), limit(20));
            if (lastVisible) {
                q = query(usersRef, orderBy("joinDate", "desc"), startAfter(lastVisible), limit(20));
            }
            const querySnapshot = await getDocs(q);
            const array = [];
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                array.push(user);
            });
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setUsers((prev) => [...prev, ...array]);
        } catch (error) {
            console.log("Lỗi khi tìm kiếm user:", error);
        }
        setLoading(false);
    };

    return currentUser?.uid !== "JpVAJcvpx4dxKc7l7ro8zLx6r0Y2" && window.location.hostname !== "localhost" ? (
        <section className="">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <img
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
                        className="h-[200px] mx-auto"
                        alt=""
                    />
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                        403
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-[#000] md:text-4xl ">Access Denied</p>
                    <p className="mb-4 text-lg font-light text-[#000]">
                        The requested page does not exist. You are not authorized to access the admin area.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[40px]"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    ) : (
        <div className="bg-blue-200 min-h-[100vh]">
            <Link
                to="/"
                className="inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[40px] m-4 gap-2"
            >
                <FaArrowAltCircleLeft />
                Home
            </Link>
            <div className="container mx-auto p-2">
                <h1 className="text-4xl font-bold mb-4 text-center">User List</h1>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {users.map((user) => (
                        <ItemUserManager user={user} key={user?.uid} />
                    ))}
                </ul>
            </div>
            {!loading && (
                <button
                    onClick={getUser}
                    className="flex justify-center items-center mx-auto rounded-[4px] font-medium text-[12px] bg-blue-300 text-blue-700 px-3 py-1 mt-6"
                >
                    load more...
                </button>
            )}
            {loading && (
                <button
                    disabled
                    className="flex justify-center items-center mx-auto rounded-[4px] font-medium text-[12px] bg-blue-200 text-blue-700 px-3 py-1 mt-6"
                >
                    <Spin />
                </button>
            )}
        </div>
    );
}

export default Admin;
