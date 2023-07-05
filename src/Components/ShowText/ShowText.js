import React, { useContext } from "react";
import ShowMoreText from "react-show-more-text";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function ShowText({ text }) {
    const { t } = useContext(MultiLanguageContext);

    const executeOnClick = (isExpanded) => {
        // console.log(isExpanded);
    };
    return (
        <ShowMoreText
            /* Default options */
            lines={4}
            more={t("more")}
            less={t("less")}
            className=""
            anchorClass="hover:underline cursor-pointer font-bold"
            onClick={executeOnClick}
            expanded={false}
            // width={280}
            truncatedEndingComponent={"... "}
        >
            {text}
        </ShowMoreText>
    );
}

export default ShowText;
