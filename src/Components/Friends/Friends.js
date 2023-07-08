import React, { useContext } from "react";
import Friend from "./Friend";
import useUser from "~/hooks/useUser";
import { Spin } from "antd";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function Friends({ uid }) {
    const { user, loading } = useUser(uid);
    const { t } = useContext(MultiLanguageContext);

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-5">
            {loading ? (
                <Spin />
            ) : (
                <>
                    {user?.friend?.map((id) => (
                        <Friend key={id} uid={id} />
                    ))}
                    {user?.friend?.length === 0 && (
                        <span className="text-[20px] font-semibold">{t("noOneFriend")}</span>
                    )}
                    {!user?.friend && <span className="text-[20px] font-semibold">{t("noOneFriend")}</span>}
                </>
            )}
        </div>
    );
}

export default Friends;
