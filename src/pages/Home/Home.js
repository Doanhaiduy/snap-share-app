import { BiLinkAlt } from "react-icons/bi";
import NewsFeed from "~/Components/NewsFeed/NewsFeed";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "~/Context/AuthContextProvider";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import CreatePost from "../../Components/CreatePost/CreatePost";
import Suggestions from "~/layouts/Components/Suggestions/Suggestions ";

function Home({ title }) {
    const { userInfo } = useContext(AuthContext);
    const { t } = useContext(MultiLanguageContext);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        document.title = `SnapShare`;
    }, [title]);
    const scrollRef = useRef();
    return (
        <>
            <div
                ref={scrollRef}
                className=" mt-[60px]  pt-[20px] lg:col-span-3 col-span-5 px-6 bg-slate-200 dark:bg-primary2 h-[100vh] overflow-y-auto "
            >
                <div className="flex justify-between items-center sm:w-[80%] mx-auto px-4 py-3 bg-white dark:bg-[#282828] rounded-[12px]">
                    <div className="flex items-center gap-3">
                        <div className="w-[40px] ">
                            <img
                                src={userInfo?.photoURL}
                                alt=""
                                className="w-[40px] h-[40px] object-cover rounded-[12px]"
                            />
                        </div>
                        <div className="font-semibold text-[#aaa] cursor-text" onClick={() => setShowModal(true)}>
                            {t("home.new")}, {userInfo?.name}
                        </div>
                    </div>
                    <div
                        onClick={() => setShowModal(true)}
                        className="text-[14px]  flex gap-1 items-center cursor-pointer hover:opacity-90 h-[40px] px-3 text-white font-medium rounded-[12px] bg-blue-600  dark:text-primary2 dark:bg-primary1"
                    >
                        <BiLinkAlt className="text-[20px]" /> {t("home.post")}
                    </div>
                </div>
                <NewsFeed scrollRef={scrollRef} />
                {showModal && <CreatePost handleCloseModal={handleCloseModal} />}
            </div>
            <Suggestions />
        </>
    );
}

export default Home;
