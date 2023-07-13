import React, { useContext, useEffect, useState } from "react";
import { BiChat } from "react-icons/bi";
import SearchItem from "./SearchItem";
import HeadlessTippy from "@tippyjs/react/headless";
import useDebounce from "~/hooks/useDebounce";
import { collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "~/firebase/firebase-config";
import { AuthContext } from "~/Context/AuthContextProvider";
import { format } from "date-fns";
import { ChatsContext } from "~/Context/ChatsContext";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function Search() {
    const [input, setInput] = useState("");
    const debounceValue = useDebounce(input);
    const [showResult, setShowResult] = useState(false);
    const [users, setUsers] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const currentDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const { windowChat, getWindowChat, chooseListContact } = useContext(ChatsContext);
    const { t } = useContext(MultiLanguageContext);

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
                const querySnapshot = await getDocs(q);
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

    const handleSelect = async (user) => {
        const combinedId = userInfo?.uid < user?.uid ? userInfo?.uid + user.uid : user?.uid + userInfo?.uid;

        try {
            const docRef = doc(db, "chats", combinedId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                // create chat in chats collection
                await setDoc(docRef, {
                    id: combinedId,
                    senderID: userInfo?.uid,
                    receiverID: user?.uid,
                    image: [],
                    file: [],
                    link: [],
                    message: [],
                    timestamp: currentDate,
                });
                await getWindowChat(combinedId);
            }
            if (docSnap.exists()) {
                await getWindowChat(combinedId);
            }
            chooseListContact(userInfo, user);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="relative search-wrapper">
            <HeadlessTippy
                interactive
                placement="bottom"
                visible={showResult && users.length > 0}
                render={(attrs) => (
                    <div className="mt-[-12px] w-full max-h-[300px] overflow-y-auto bg-slate-100 dark:bg-[#444] rounded-[10px] py-[10px]">
                        {users
                            .filter((user) => user?.uid !== userInfo?.uid)
                            .map((user) => (
                                <SearchItem
                                    user={user}
                                    key={user?.uid}
                                    handleSelect={handleSelect}
                                    handleHideResult={handleHideResult}
                                />
                            ))}
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className="p-3 relative font-normal w-full">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder={t("chats.sidebar.placeholder")}
                        className="py-2 pl-[30px] pr-2 w-full  placeholder:text-[#99a3a7] bg-[#f8f8f8] rounded-[10px] dark:bg-[#373737]  outline-none max-w-full"
                    />
                    <BiChat className="absolute top-1/2 text-[#99a3a7] translate-y-[-50%] left-[22px] " />
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
