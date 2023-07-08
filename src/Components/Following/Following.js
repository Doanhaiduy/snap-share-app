import React, { useContext } from "react";
import Follower from "../Followers/Follower";
import useUser from "~/hooks/useUser";
import { Spin } from "antd";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function Following({ uid }) {
    const { t } = useContext(MultiLanguageContext);
    const { user, loading } = useUser(uid);
    return (
        <div className="grid grid-cols-1 gap-4  mt-5">
            {loading ? (
                <Spin />
            ) : (
                <>
                    {user?.following?.map((id) => (
                        <Follower key={id} uid={id} />
                    ))}
                    {user?.following?.length === 0 && (
                        <span className="text-[20px] font-semibold">{t("noOneFollowing")}</span>
                    )}
                    {!user?.following && <span className="text-[20px] font-semibold">{t("noOneFollowing")}</span>}
                </>
            )}
        </div>
    );
}

export default Following;
