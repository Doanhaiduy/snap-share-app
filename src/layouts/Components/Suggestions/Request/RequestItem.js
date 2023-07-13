import { useContext } from "react";
import { Link } from "react-router-dom";
import AcceptFriend from "~/Components/Button/AcceptFriend/AcceptFriend";
import DeclineFriend from "~/Components/Button/DeclineFriend/DeclineFriend";
import { ProfileContext } from "~/Context/ProfileContextProvider";
import useUser from "~/hooks/useUser";

function RequestItem({ t, uid }) {
    const { user } = useUser(uid);
    const { setCurrentProfile } = useContext(ProfileContext);
    return (
        <div className=" bg-white dark:bg-[#282828] dark:text-primary5 h-auto p-4 flex flex-col items-center gap-4 rounded-[12px] ">
            <div className="flex items-center gap-4">
                <img
                    className=" h-[45px] min-w-[45px] object-cover rounded-[12px] flex-1"
                    src={user?.photoURL}
                    alt=""
                />
                <p className="line-clamp-2">
                    <Link
                        to={`/profile/${user?.nameId || user?.uid}`}
                        onClick={() => {
                            localStorage.setItem("currentProfile", JSON.stringify(user));
                            setCurrentProfile(user);
                        }}
                        className="font-bold"
                    >
                        {user?.name}
                    </Link>{" "}
                    {t("suggestion.request.desc")}
                </p>
            </div>
            <div className="flex items-center gap-x-5" aria-label="button-combination">
                <AcceptFriend targetUser={user} />
                <DeclineFriend targetUser={user} />
            </div>
        </div>
    );
}

export default RequestItem;
