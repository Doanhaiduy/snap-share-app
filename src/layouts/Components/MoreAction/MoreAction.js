import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React, { useContext, useState } from "react";
import Theme from "../../../Components/Theme/Theme";

import PrivacyPolicy from "./../../../pages/PrivacyPolicy/PrivacyPolicy";
import CookiesPolicy from "../../../pages/CookiesPolicy/CookiesPolicy";
import TermsConditions from "../../../pages/TermsConditions/TermsConditions";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";
import CookieIcon from "@mui/icons-material/Cookie";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DescriptionIcon from "@mui/icons-material/Description";
import { ThemeContext } from "~/Context/ThemeContextProvider";
function MoreAction() {
    const { darkToggle } = useContext(ThemeContext);
    const { t } = useContext(MultiLanguageContext);
    const [showModal, setShowModal] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const handleModalOpen = (modalName) => {
        setShowModal(true);
        setActiveModal(modalName);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActiveModal(null);
    };

    return (
        <div>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "fixed", bottom: window.location.pathname === "/chats" ? 80 : 40, right: 16 }}
                icon={<SpeedDialIcon />}
                FabProps={{
                    sx: {
                        bgcolor: `${darkToggle ? "#FFFD01E6" : "#6366F1"}`,
                        color: `${darkToggle ? "#000" : "#FFF"}`,
                        "&:hover": {
                            bgcolor: `${darkToggle ? "#CCCD01E6" : "#4366F1"}`,
                        },
                    },
                }}
            >
                <SpeedDialAction
                    key={"theme"}
                    icon={<Theme />}
                    tooltipTitle={t("theme.theme")}
                    FabProps={{
                        sx: {
                            bgcolor: `${darkToggle ? "#555" : "#FFF"}`,
                            "&:hover": {
                                bgcolor: `${darkToggle ? "#666" : "#DDD"}`,
                            },
                        },
                    }}
                />
                <SpeedDialAction
                    key={"cookiesPolicy"}
                    icon={<CookieIcon />}
                    tooltipTitle={t("cookiesPolicy")}
                    onClick={() => handleModalOpen("cookiesPolicy")}
                    FabProps={{
                        sx: {
                            color: `${darkToggle ? "#FFFD01E6" : "#6366F1"}`,
                            bgcolor: `${darkToggle ? "#555" : "#FFF"}`,
                            "&:hover": {
                                bgcolor: `${darkToggle ? "#666" : "#DDD"}`,
                            },
                        },
                    }}
                />
                <SpeedDialAction
                    key={"termsConditions"}
                    icon={<DescriptionIcon />}
                    tooltipTitle={t("termsConditions")}
                    onClick={() => handleModalOpen("termsConditions")}
                    FabProps={{
                        sx: {
                            color: `${darkToggle ? "#FFFD01E6" : "#6366F1"}`,
                            bgcolor: `${darkToggle ? "#555" : "#FFF"}`,
                            "&:hover": {
                                bgcolor: `${darkToggle ? "#666" : "#DDD"}`,
                            },
                        },
                    }}
                />
                <SpeedDialAction
                    key={"privacyPolicy"}
                    icon={<AdminPanelSettingsIcon />}
                    tooltipTitle={t("privacyPolicy")}
                    onClick={() => handleModalOpen("privacyPolicy")}
                    FabProps={{
                        sx: {
                            color: `${darkToggle ? "#FFFD01E6" : "#6366F1"}`,
                            bgcolor: `${darkToggle ? "#555" : "#FFF"}`,
                            "&:hover": {
                                bgcolor: `${darkToggle ? "#666" : "#DDD"}`,
                            },
                        },
                    }}
                />
            </SpeedDial>
            {showModal && activeModal === "privacyPolicy" && <PrivacyPolicy handleCloseModal={handleCloseModal} />}
            {showModal && activeModal === "termsConditions" && <TermsConditions handleCloseModal={handleCloseModal} />}
            {showModal && activeModal === "cookiesPolicy" && <CookiesPolicy handleCloseModal={handleCloseModal} />}
        </div>
    );
}

export default MoreAction;
