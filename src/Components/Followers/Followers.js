import React, { useContext } from "react";
import Follower from "./Follower";
import useUser from "~/hooks/useUser";
import { Spin } from "antd";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function Followers({ uid }) {
    const { user, loading } = useUser(uid);
    const { t } = useContext(MultiLanguageContext);

    return (
        <div className="grid md:grid-cols-3 gap-4  mt-5 grid-cols-1 text-center">
            {loading ? (
                <Spin />
            ) : (
                <>
                    {user?.followers?.map((id) => (
                        <Follower key={id} uid={id} />
                    ))}
                    {user?.followers?.length === 0 && (
                        <span className="text-[20px] font-semibold">{t("noOneFollower")}</span>
                    )}
                    {!user?.followers && <span className="text-[20px] font-semibold">{t("noOneFollower")}</span>}
                </>
            )}
        </div>
    );
}

export default Followers;
