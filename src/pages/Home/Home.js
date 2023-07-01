import { BiLinkAlt } from "react-icons/bi";
import NewsFeed from "../../Components/NewsFeed/NewsFeed";
import { useContext, useRef } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { Link } from "react-router-dom";
import { MultiLanguageContext } from "../../Context/MultiLanguageContextProvider";

function Home() {
    const { userInfo } = useContext(AuthContext);
    const { t } = useContext(MultiLanguageContext);

    const scrollRef = useRef();
    return (
        <div
            ref={scrollRef}
            className=" pt-[80px] lg:col-span-3 col-span-5 px-6 bg-slate-200 dark:bg-primary2 h-[100vh] overflow-y-scroll no-scrollbar "
        >
            <div className="flex justify-between items-center sm:w-[80%] mx-auto px-4 py-3 bg-white dark:bg-[#282828] rounded-[12px]">
                <div className="flex items-center gap-3">
                    <div className="w-[40px] ">
                        <img src={userInfo?.photoURL} alt="" className="w-[40px] h-[40px] rounded-[12px]" />
                    </div>
                    <Link className="font-semibold text-[#aaa] cursor-text" to="/createPost">
                        {t("home.new")}, {userInfo.name}
                    </Link>
                </div>
                <Link
                    to="/createPost"
                    className="text-[14px]  flex gap-1 items-center cursor-pointer hover:opacity-90 h-[40px] px-3 text-white font-medium rounded-[12px] bg-blue-600  dark:text-primary2 dark:bg-primary1"
                >
                    <BiLinkAlt className="text-[20px]" /> {t("home.post")}
                </Link>
            </div>
            <NewsFeed scrollRef={scrollRef} />
        </div>
    );
}

export default Home;
