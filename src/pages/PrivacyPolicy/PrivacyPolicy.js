import React, { useContext, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function PrivacyPolicy({ handleCloseModal }) {
    const { t } = useContext(MultiLanguageContext);
    useEffect(() => {
        document.title = `Privacy Policy | SnapShare`;
    }, []);
    return (
        <div className="relative z-[51]">
            <div
                className="fixed top-0 left-0 right-0 bottom-0 dark:bg-black bg-slate-600 opacity-70"
                onClick={() => handleCloseModal()}
            ></div>
            <div className="dark:text-white px-8 text-primary2 w-[80%] h-[80%] top-[10%] dark:bg-[#282828] bg-slate-100 fixed  left-0 right-0 overflow-y-auto p-6 pb-12 mx-auto  rounded-md shadow-md ">
                <span
                    className="absolute top-[20px] right-[20px] text-[2.4rem] cursor-pointer"
                    onClick={() => handleCloseModal()}
                >
                    <AiOutlineCloseCircle />
                </span>
                <h1 className="dark:text-primary1 text-blue-600 text-[3rem] mt-4 font-bold text-center pb-5">
                    {t("privacyPolicyPage.title")}
                </h1>
                <p className="my-1">{t("privacyPolicyPage.lastUpdated")}</p>
                <p className="my-1">{t("privacyPolicyPage.description1")}</p>
                <p className="my-1">{t("privacyPolicyPage.description2")}</p>
                <h1 className="dark:text-primary1 text-blue-600 text-[2rem] mt-4 font-bold">
                    {t("privacyPolicyPage.interpretation.title")}
                </h1>
                <h2 className=" text-[1.6rem] font-semibold mt-2">
                    {t("privacyPolicyPage.interpretation.interpretationHeading")}
                </h2>
                <p className="my-1">{t("privacyPolicyPage.interpretation.interpretationDescription")}</p>
                <h2 className=" text-[1.6rem] font-semibold mt-2">
                    {t("privacyPolicyPage.interpretation.definitionsHeading")}
                </h2>
                <p className="my-1">{t("privacyPolicyPage.interpretation.definitions.overView")}</p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.interpretation.definitions.arrayMap", { returnObjects: true }).map(
                        (item, index) => (
                            <li className="ml-8 list-disc" key={index}>
                                <p className="my-1">
                                    <strong>{t(item.title)}: </strong>
                                    {t(item.description)}
                                </p>
                            </li>
                        )
                    )}

                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            <strong>{t("privacyPolicyPage.interpretation.definitions.website.title")}: </strong>
                            {t("privacyPolicyPage.interpretation.definitions.website.description")}
                            <a
                                className="underline dark:text-primary1 text-blue-600"
                                href="https://snap-share-78f51.web.app/"
                                rel="external nofollow noopener noreferrer"
                                target="_blank"
                            >
                                {t("privacyPolicyPage.interpretation.definitions.website.URL")}
                            </a>
                        </p>
                    </li>
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            <strong>{t("privacyPolicyPage.interpretation.definitions.you.title")}: </strong>{" "}
                            {t("privacyPolicyPage.interpretation.definitions.you.description")}
                        </p>
                    </li>
                </ul>
                <h1 className="dark:text-primary1 text-blue-600 text-[2rem] mt-4 font-bold">
                    {t("privacyPolicyPage.collectingAndUsingData.title")}
                </h1>
                <h2 className=" text-[1.6rem] font-semibold mt-2">
                    {t("privacyPolicyPage.collectingAndUsingData.dataCollected.title")}
                </h2>
                <h3 className="text-[1.2rem] font-semibold mt-2">
                    {t("privacyPolicyPage.collectingAndUsingData.dataCollected.personalData.title")}
                </h3>
                <p className="my-1">
                    {t("privacyPolicyPage.collectingAndUsingData.dataCollected.personalData.description")}
                </p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.collectingAndUsingData.dataCollected.personalDataPoints", {
                        returnObjects: true,
                    }).map((item, index) => (
                        <li className="ml-8 list-disc" key={index}>
                            <p className="my-1">{item}</p>
                        </li>
                    ))}
                </ul>
                <h3 className="text-[1.2rem] font-semibold mt-2">
                    {t("privacyPolicyPage.collectingAndUsingData.usageData.title")}
                </h3>
                <p className="my-1">{t("privacyPolicyPage.collectingAndUsingData.usageData.description")}</p>

                {t("privacyPolicyPage.collectingAndUsingData.usageDataPoints", { returnObjects: true }).map(
                    (item, index) => (
                        <p className="my-1" key={index}>
                            {item}
                        </p>
                    )
                )}
                <h3 className="text-[1.2rem] font-semibold mt-2">
                    {t("privacyPolicyPage.collectingAndUsingData.mobileDeviceData.title")}
                </h3>
                <p className="my-1">{t("privacyPolicyPage.collectingAndUsingData.mobileDeviceData.description")}</p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.collectingAndUsingData.mobileDeviceDataPoints", { returnObjects: true }).map(
                        (item, index) => (
                            <li key={index} className="ml-8 list-disc">
                                {item}
                            </li>
                        )
                    )}
                </ul>
                <p className="my-1">
                    {t("privacyPolicyPage.collectingAndUsingData.mobileDeviceDataAdditionalInfo.description_1")}
                </p>
                <p className="my-1">
                    {t("privacyPolicyPage.collectingAndUsingData.mobileDeviceDataAdditionalInfo.description_2")}
                </p>
                <h3 className="text-[1.2rem] font-semibold mt-2">
                    {t("privacyPolicyPage.collectingAndUsingData.trackingTechnologies.title")}
                </h3>
                <p className="my-1">{t("privacyPolicyPage.collectingAndUsingData.trackingTechnologies.description")}</p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.collectingAndUsingData.trackingTechnologiesPoints", {
                        returnObjects: true,
                    }).map((item, index) => (
                        <li className="ml-8 list-disc" key={index}>
                            <strong>{item.title}</strong> {item.desc}
                        </li>
                    ))}
                </ul>
                <p className="my-1">
                    {t("privacyPolicyPage.collectingAndUsingData.trackingTechnologiesPointsOverview")}
                </p>
                <p className="my-1">{t("privacyPolicyPage.collectingAndUsingData.cookiesPolicy.description")}</p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.collectingAndUsingData.cookiesPolicyPoints", {
                        returnObjects: true,
                    }).map((item, index) => (
                        <li className="ml-8 list-disc" key={index}>
                            <p className="my-1">
                                <strong>{item.type}</strong>
                            </p>
                            <p className="my-1">
                                {item.typeName}: {item.cookieType}
                            </p>
                            <p className="my-1">
                                {item.administeredByName}: {item.administeredBy}
                            </p>
                            <p className="my-1">
                                {item.purposeName}: {item.purpose}
                            </p>
                        </li>
                    ))}
                </ul>
                <p className="my-1">{t("privacyPolicyPage.collectingAndUsingData.additionalInfo")}</p>
                <h2 className=" text-[1.6rem] font-semibold mt-2">{t("privacyPolicyPage.useOfPersonalData.title")}</h2>
                <p className="my-1">{t("privacyPolicyPage.useOfPersonalData.overView_1")}</p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.useOfPersonalData.purposes", {
                        returnObjects: true,
                    }).map((item, index) => (
                        <li className="ml-8 list-disc" key={index}>
                            <p className="my-1">
                                <strong>{item.purpose_highlight}</strong> {item.purpose}
                            </p>
                        </li>
                    ))}
                </ul>
                <p className="my-1">{t("privacyPolicyPage.useOfPersonalData.overView_2")}</p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.useOfPersonalData.sharingSituations", {
                        returnObjects: true,
                    }).map((item, index) => (
                        <li className="ml-8 list-disc" key={index}>
                            <p className="my-1">
                                <strong>{item.situation_highlight}</strong> {item.situation}
                            </p>
                        </li>
                    ))}
                </ul>
                <h2 className=" text-[1.6rem] font-semibold mt-2">{t("privacyPolicyPage.retentionOfData.title")}</h2>

                {t("privacyPolicyPage.retentionOfData.paragraphs", { returnObjects: true }).map((item, index) => (
                    <p className="my-1" key={index}>
                        {item.text}
                    </p>
                ))}
                <h2 className=" text-[1.6rem] font-semibold mt-2">{t("privacyPolicyPage.transferOfData.title")}</h2>
                {t("privacyPolicyPage.transferOfData.paragraphs", { returnObjects: true }).map((item, index) => (
                    <p className="my-1" key={index}>
                        {item.text}
                    </p>
                ))}
                <h2 className=" text-[1.6rem] font-semibold mt-2">{t("privacyPolicyPage.deletePersonalData.title")}</h2>
                {t("privacyPolicyPage.deletePersonalData.paragraphs", { returnObjects: true }).map((item, index) => (
                    <p className="my-1" key={index}>
                        {item.text}
                    </p>
                ))}
                <h2 className=" text-[1.6rem] font-semibold mt-2">
                    {t("privacyPolicyPage.disclosureOfPersonalData.title")}
                </h2>
                <h3 className="text-[1.2rem] font-semibold mt-2">
                    {t("privacyPolicyPage.disclosureOfPersonalData.businessTransactions.title")}
                </h3>
                <p className="my-1">{t("privacyPolicyPage.disclosureOfPersonalData.businessTransactions.content")}</p>
                <h3 className="text-[1.2rem] font-semibold mt-2">
                    {t("privacyPolicyPage.disclosureOfPersonalData.lawEnforcement.title")}
                </h3>
                <p className="my-1">{t("privacyPolicyPage.disclosureOfPersonalData.lawEnforcement.content")}</p>
                <h3 className="text-[1.2rem] font-semibold mt-2">
                    {t("privacyPolicyPage.disclosureOfPersonalData.otherLegalRequirements.title")}
                </h3>
                <p className="my-1">{t("privacyPolicyPage.disclosureOfPersonalData.otherLegalRequirements.content")}</p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.disclosureOfPersonalData.otherLegalRequirements.listItems", {
                        returnObjects: true,
                    }).map((item, index) => (
                        <li className="ml-8 list-disc" key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
                <h2 className=" text-[1.6rem] font-semibold mt-2">
                    {t("privacyPolicyPage.securityOfPersonalData.title")}
                </h2>
                <p className="my-1">{t("privacyPolicyPage.securityOfPersonalData.content")}</p>
                <h1 className="dark:text-primary1 text-blue-600 text-[2rem] mt-4 font-bold">
                    {t("privacyPolicyPage.childrensPrivacy.title")}
                </h1>
                <p className="my-1">{t("privacyPolicyPage.childrensPrivacy.content_1")}</p>
                <p className="my-1">{t("privacyPolicyPage.childrensPrivacy.content_2")}</p>
                <h1 className="dark:text-primary1 text-blue-600 text-[2rem] mt-4 font-bold">
                    {t("privacyPolicyPage.linksToOtherWebsites.title")}
                </h1>
                <p className="my-1">{t("privacyPolicyPage.linksToOtherWebsites.content_1")}</p>
                <p className="my-1">{t("privacyPolicyPage.linksToOtherWebsites.content_2")}</p>
                <h1 className="dark:text-primary1 text-blue-600 text-[2rem] mt-4 font-bold">
                    {t("privacyPolicyPage.changesToPrivacyPolicy.title")}
                </h1>
                <p className="my-1">{t("privacyPolicyPage.changesToPrivacyPolicy.content_1")}</p>
                <p className="my-1">{t("privacyPolicyPage.changesToPrivacyPolicy.content_2")}</p>
                <p className="my-1">{t("privacyPolicyPage.changesToPrivacyPolicy.content_3")}</p>
                <h1 className="dark:text-primary1 text-blue-600 text-[2rem] mt-4 font-bold">
                    {t("privacyPolicyPage.contactUs.title")}
                </h1>
                <p className="my-1"> {t("privacyPolicyPage.contactUs.overView")}</p>
                <ul className="flex flex-col gap-3">
                    {t("privacyPolicyPage.contactUs.content", {
                        returnObjects: true,
                    }).map((item, index) => (
                        <li className="ml-8 list-disc" key={index}>
                            <p className="my-1">
                                {item.title}{" "}
                                <a
                                    className="underline dark:text-primary1 text-blue-600"
                                    href={`${item.href}: ${item.content}`}
                                >
                                    {item.content}
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default PrivacyPolicy;
