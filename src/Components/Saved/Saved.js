import React, { useContext } from "react";
import { MultiLanguageContext } from "../../Context/MultiLanguageContextProvider";

function Saved(props) {
    const { t } = useContext(MultiLanguageContext);

    return (
        <div className="mt-5">
            <p className="text-[20px] font-semibold">{t("noOneSaved")}</p>
        </div>
    );
}

export default Saved;
