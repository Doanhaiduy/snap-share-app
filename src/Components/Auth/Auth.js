import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    getAdditionalUserInfo,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db, googleProvider, githubProvider } from "../../firebase/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import { Spin } from "antd";
import logo from "../../assets/imgs/Logo.png";
import defaultAvatar from "../../assets/imgs/defaultAvatar.png";

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const [loading, setLoading] = useState(false);
    const handleRegex = (type, value, confirmPassword) => {
        switch (type) {
            case "email": {
                const validRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
                if (validRegex.test(value)) {
                    return true;
                } else {
                    toast.error("Invalid email address!", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    return false;
                }
            }
            case "password": {
                const validRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
                if (validRegex.test(value)) {
                    return true;
                } else {
                    toast.error("Invalid password", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    return false;
                }
            }
            case "confirmPassword": {
                if (value === confirmPassword) {
                    return true;
                } else {
                    alert("Password does not match!");
                    return false;
                }
            }
            case "fullName": {
                const validRegex =
                    /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/g;
                if (validRegex.test(value)) {
                    return true;
                } else {
                    toast.error("Invalid name, Please enter a valid name.", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    return false;
                }
            }
            default:
                throw new Error("invalid type Input");
        }
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (handleRegex("fullName", name) && handleRegex("email", email) && handleRegex("password", password)) {
                setLoading(true);
                await setTimeout(() => {
                    createUserWithEmailAndPassword(auth, email, password)
                        .then(async (userCredential) => {
                            updateProfile(userCredential.user, {
                                displayName: name,
                                photoURL: "https://giamcanherbalthin.com/meo-tang-hoa/imager_20274.jpg",
                            });
                            setDoc(doc(db, "users", userCredential.user?.uid), {
                                name,
                                email,
                                joinDate: currentDate,
                                uid: userCredential.user?.uid,
                                bio: "Congratulations! You have become a member of the SnapShare community. Welcome!",
                                coverImg:
                                    "https://static.vecteezy.com/system/resources/previews/003/423/831/original/cute-cat-kitten-greeting-cartoon-doodle-background-wallpaper-free-vector.jpg",
                                photoURL: defaultAvatar,
                            });
                            setLoading(false);
                        })
                        .catch((err) => {
                            toast.error(`The email provided is already in use!`, {
                                position: "top-right",
                                autoClose: 4000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            setLoading(false);
                        });
                }, 1000);
            }
        } catch (err) {}
    };

    const handleRLogin = async (e) => {
        e.preventDefault();
        try {
            if (handleRegex("email", email) && handleRegex("password", password)) {
                setLoading(true);
                await setTimeout(() => {
                    signInWithEmailAndPassword(auth, email, password).catch((err) => {
                        toast.error(`Invalid email or password !`, {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
                    setLoading(false);
                }, 1000);
            }
        } catch (err) {}
    };

    const handleRLoginGoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const details = getAdditionalUserInfo(result);
            const isNewUser = details.isNewUser;
            if (isNewUser) {
                await setDoc(doc(db, "users", result.user?.uid), {
                    name: result.user.displayName,
                    email: result.user.email,
                    joinDate: currentDate,
                    uid: result.user?.uid,
                    bio: "Congratulations! You have become a member of the SnapShare community. Welcome!",
                    coverImg:
                        "https://static.vecteezy.com/system/resources/previews/003/423/831/original/cute-cat-kitten-greeting-cartoon-doodle-background-wallpaper-free-vector.jpg",
                    photoURL: result?.user?.photoURL || defaultAvatar,
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
        }
    };

    const handleRLoginGithub = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const details = getAdditionalUserInfo(result);
            const isNewUser = details.isNewUser;
            if (isNewUser) {
                await setDoc(doc(db, "users", result.user?.uid), {
                    name: result.user.displayName,
                    email: result.user.email,
                    joinDate: currentDate,
                    uid: result.user?.uid,
                    bio: "Congratulations! You have become a member of the FecaBook community. Welcome!",
                    coverImg:
                        "https://static.vecteezy.com/system/resources/previews/003/423/831/original/cute-cat-kitten-greeting-cartoon-doodle-background-wallpaper-free-vector.jpg",
                    photoURL: result?.user?.photoURL || "https://giamcanherbalthin.com/meo-tang-hoa/imager_20274.jpg",
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
        }
    };
    return loading ? (
        <div className="flex justify-center items-center h-[100vh] flex-col">
            <Spin />
            <h2 className="text-[20px] text-blue-600 font-[700]">Login...</h2>
        </div>
    ) : isLogin ? (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <ToastContainer />
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img src={logo} className="w-32 mx-auto" alt="" />
                        <p className="text-center text-[10px] font-[600] font-sans mt-[-12px] mb-[30px] text-gray-500">
                            Preserve Memories, Share Stories
                        </p>
                    </div>
                    <div className="mt-1 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                                    onClick={handleRLoginGoogle}
                                >
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Sign in with Google</span>
                                </button>
                                <button
                                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                                    onClick={handleRLoginGithub}
                                >
                                    <div className="bg-white p-1 rounded-full">
                                        <svg className="w-6" viewBox="0 0 32 32">
                                            <path
                                                fillRule="evenodd"
                                                d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Sign in with GitHub</span>
                                </button>
                            </div>
                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Sign in up with e-mail
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={handleRLogin}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-log-in"
                                    >
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                        <polyline points="10 17 15 12 10 7"></polyline>
                                        <line x1="15" y1="12" x2="3" y2="12"></line>
                                    </svg>
                                    <span className="ml-3">Sign in</span>
                                </button>
                                <div className="mt-6 text-xs text-gray-600 text-center">
                                    <p className="mx-auto mt-4">
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
                                            Sign up
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex  justify-center">
            <ToastContainer />
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex-row-reverse flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 sm:mt-0 mt-[50px]">
                    <div>
                        <img src={logo} className="w-32 mx-auto" alt="" />
                        <p className="text-center text-[10px] font-[600] font-sans mt-[-12px] mb-[30px] text-gray-500">
                            Preserve Memories, Share Stories
                        </p>
                    </div>
                    <div className="mt-2 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                        <div className="w-full flex-1 mt-3">
                            <div className="flex flex-col items-center"></div>
                            <div className="my-3 border-b text-center  mb-[50px]">
                                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2 ">
                                    Sign up up with e-mail
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="name"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                <input
                                    className="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={handleRegister}
                                >
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>

                                    <span className="ml-3">Sign up</span>
                                </button>
                                <div className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by SnapShare's
                                    <p href="#" className=" border-gray-500 border-dotted">
                                        Terms of Service
                                    </p>
                                    <p className="mx-auto mt-4">
                                        Do you already have an account?{" "}
                                        <strong
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setEmail("");
                                                setPassword("");
                                                setIsLogin(true);
                                            }}
                                        >
                                            Sign in
                                        </strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div
                        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage:
                                'url("https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp")',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
