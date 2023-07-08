import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "~/firebase/firebase-config";
import useDebounce from "../../hooks/useDebounce";
import ItemSearch from "./ItemSearch";
import HeadlessTippy from "@tippyjs/react/headless";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function Search(props) {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [showResult, setShowResult] = useState(false);
    const { t } = useContext(MultiLanguageContext);

    const debounceValue = useDebounce(searchInput);

    const handleShowResult = () => {
        setShowResult(true);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    useEffect(() => {
        const handleSearch = async () => {
            try {
                if (debounceValue === "") {
                    setUsers([]);
                    handleHideResult();
                    return;
                }
                const usersRef = collection(db, "users");
                const q = query(usersRef);
                const querySnapshot = await getDocs(q, orderBy("releaseDate", "desc"));
                const array = [];
                querySnapshot.forEach((doc) => {
                    const user = doc.data();
                    array.push(user);
                });
                const filteredArray = array.filter((obj) =>
                    obj?.name?.toLowerCase().includes(debounceValue?.toLowerCase())
                );
                setUsers(filteredArray);
                handleShowResult();
            } catch (error) {
                console.log("Lỗi khi tìm kiếm user:", error);
            }
        };
        handleSearch();
    }, [debounceValue]);
    return (
        <div className="flex items-center  gap-3  w-[full] border-[#ccc] rounded-[12px] relative ">
            <HeadlessTippy
                interactive
                placement="bottom"
                visible={showResult && users.length > 0}
                render={(attrs) => (
                    <div
                        {...attrs}
                        className="z-30 bg-slate-100 dark:bg-[#282828] dark:text-primary5 shadow-xl py-2 rounded-[12px] w-[90vw] sm:w-full max-h-[500px] overflow-y-auto "
                    >
                        {users.map((user) => (
                            <ItemSearch user={user} key={user.uid} handleHideResult={handleHideResult} />
                        ))}
                        {showResult && (
                            <p className="w-full text-center font-semibold cursor-pointer absolute bottom-[-12px] z-10 bg-white dark:bg-[#555] rounded-b-[12px]">
                                {t("search.all")} "{debounceValue}"
                            </p>
                        )}
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className="flex items-center gap-2 bg-slate-200  dark:bg-primary2 rounded-[12px]">
                    <span className="flex-shrink-0  text-gray-500 ml-1 dark:text-primary5 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>
                    <input
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="text"
                        className="text-[1.1rem]  max-w-[300px] dark:placeholder:text-white lg:w-[320px] sm:w-[200px] w-[150px]  h-[40px] outline-none bg-slate-200 dark:bg-primary2 dark:text-primary5  rounded-[12px] pr-2  placeholder:text-[12px] sm:placeholder:text-[16px]"
                        placeholder={t("search.placeholder")}
                        onFocus={handleShowResult}
                    />
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
