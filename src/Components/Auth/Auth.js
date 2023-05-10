import React, { useContext, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    getAdditionalUserInfo,
    getRedirectResult,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db, googleProvider } from "../../firebase/firebase-config";
import { FaGoogle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: name,
                });
                setDoc(doc(db, "users", userCredential.user.uid), {
                    name,
                    email,
                    joinDate: currentDate,
                    uid: userCredential.user.uid,
                    bio: "",
                });
            });
        } catch (err) {
            toast.error("registration failed, please try again !", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(err);
        }
    };

    const handleRLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            toast.error("The password that you've entered is incorrect !", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(err);
        }
    };

    const handleRLoginGoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const details = getAdditionalUserInfo(result);
            const isNewUser = details.isNewUser;
            if (isNewUser) {
                await setDoc(doc(db, "users", result.user.uid), {
                    name: result.user.displayName,
                    email: result.user.email,
                    joinDate: currentDate,
                    uid: result.user.uid,
                    bio: "",
                    photoURL: result.user.photoURL,
                });
            }
        } catch (err) {
            toast.error("Login fail !", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(err);
        }
    };
    return isLogin ? (
        <div className="flex items-center justify-center h-[100vh]">
            <ToastContainer />
            <div className="flex w-[70vw] bg-slate-700 h-[700px] text-white ">
                <div className="w-1/2 bg-slate-950"></div>
                <div className="w-1/2 p-8">
                    <h2 className="text-[70px] font-semibold text-center my-12">Login</h2>
                    <form action="" className="flex flex-col gap-6 mt-2 ">
                        <div className="flex flex-col gap-3 font-medium">
                            <label htmlFor="email" className="flex-1 text-xl">
                                Email:
                            </label>
                            <input
                                value={email}
                                type="text"
                                id="email"
                                className="p-2 rounded-lg text-black"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3 font-medium">
                            <label htmlFor="password" className="flex-1 text-xl">
                                Password:
                            </label>
                            <input
                                value={password}
                                type="text "
                                id="password"
                                className="p-2 rounded-lg text-black"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="py-2 text-2xl font-medium bg-blue-600 w-1/4 flex items-center justify-center hover:opacity-90 mx-auto rounded-lg mt-2"
                            onClick={handleRLogin}
                        >
                            Login
                        </button>
                        <button
                            className="border-[1px] w-2/3 text-xl mx-auto py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors flex items-center gap-3 justify-center"
                            onClick={handleRLoginGoogle}
                        >
                            <FaGoogle /> Login with Google
                        </button>
                        <p className="mx-auto">
                            Do not have an account?{" "}
                            <strong
                                className="cursor-pointer"
                                onClick={() => {
                                    setName("");
                                    setEmail("");
                                    setPassword("");
                                    setIsLogin(false);
                                }}
                            >
                                Register
                            </strong>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-[100vh]">
            <ToastContainer />
            <div className="flex w-[70vw] bg-slate-700 h-[700px] text-white">
                <div className="w-1/2 bg-slate-950"></div>
                <div className="w-1/2 p-8">
                    <h2 className="text-[70px] font-semibold text-center my-12">Register</h2>

                    <form action="" className="flex flex-col gap-4 mt-0">
                        <div className="flex flex-col gap-1 font-medium">
                            <label htmlFor="name" className="flex-1 text-xl">
                                Name:
                            </label>
                            <input
                                value={name}
                                type="text"
                                id="name"
                                className="p-2 rounded-lg text-black"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3 font-medium">
                            <label htmlFor="email" className="flex-1 text-xl">
                                Email:
                            </label>
                            <input
                                value={email}
                                type="text"
                                id="email"
                                className="p-2 rounded-lg text-black"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3 font-medium">
                            <label htmlFor="password" className="flex-1 text-xl">
                                Password:
                            </label>
                            <input
                                value={password}
                                type="text "
                                id="password"
                                className="p-2 rounded-lg text-black"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="py-2 text-2xl  font-medium bg-blue-600 w-1/3 flex items-center justify-center hover:opacity-90 mx-auto rounded-lg my-4"
                            onClick={handleRegister}
                        >
                            Register
                        </button>

                        <p className="mx-auto">
                            Do you already have an account?{" "}
                            <strong
                                className="cursor-pointer"
                                onClick={() => {
                                    setEmail("");
                                    setPassword("");
                                    setIsLogin(true);
                                }}
                            >
                                Login
                            </strong>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
