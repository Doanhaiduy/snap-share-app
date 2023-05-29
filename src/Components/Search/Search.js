import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import useDebounce from "../../hooks/useDebounce";
import ItemSearch from "./ItemSearch";

function Search(props) {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const debounceValue = useDebounce(searchInput);

    useEffect(() => {
        const handleSearch = async () => {
            try {
                if (debounceValue === "") {
                    setUsers([]);
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
            } catch (error) {
                console.log("Lỗi khi tìm kiếm user:", error);
            }
        };
        handleSearch();
    }, [debounceValue]);

    return (
        <div className="flex items-center mx-auto gap-3 border w-[full] border-[#ccc] rounded-[12px] relative ">
            <span className="flex-shrink-0 text-gray-500 ml-1">
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
                className="text-[1.3rem] w-full  h-[40px] outline-none bg-transparent pr-2  placeholder:text-[18px] sm:placeholder:text-[22px]"
                placeholder="Enter  profile name..."
            />
        
            {users.length > 0 && (
                <div className="absolute top-[50px] mt-[12px] z-30 bg-slate-100  shadow-xl py-2 rounded-[12px] w-[90vw] sm:left-0 left-[-120px] sm:w-full max-h-[800px] overflow-y-auto">
                    {users.map((user) => (
                        <ItemSearch user={user} key={user.uid} />
                    ))}
                    <p className="w-full text-center font-semibold cursor-pointer">
                        search all results for "{debounceValue}"
                    </p>
                </div>
            )}
        </div>
    );
}

export default Search;
