import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CookiesPolicy({ handleCloseModal }) {
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
                    Cookies Policy
                </h1>
                <p className="my-1">Last updated: June 25, 2023</p>

                <p className="my-1">
                    Cookies do not typically contain any information that personally identifies a user, but personal
                    information that we store about You may be linked to the information stored in and obtained from
                    Cookies. For further information on how We use, store and keep your personal data secure, see our
                    Privacy Policy.
                </p>
                <p className="my-1">
                    We do not store sensitive personal information, such as mailing addresses, account passwords, etc.
                    in the Cookies We use.
                </p>
                <h1 className="dark:text-primary1 text-blue-600 text-[2rem] mt-4 font-bold">
                    Interpretation and Definitions
                </h1>
                <h2 className="text-[1.6rem] font-semibold mt-2">Interpretation</h2>
                <p className="my-1">
                    The words of which the initial letter is capitalized have meanings defined under the following
                    conditions. The following definitions shall have the same meaning regardless of whether they appear
                    in singular or in plural.
                </p>
                <h2 className="text-[1.6rem] font-semibold mt-2">Definitions</h2>
                <p className="my-1">For the purposes of this Cookies Policy:</p>
                <ul className="flex flex-col gap-3">
                    <li className="ml-8 list-disc">
                        <strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;,
                        &quot;Us&quot; or &quot;Our&quot; in this Cookies Policy) refers to Snap Share.
                    </li>
                    <li className="ml-8 list-disc">
                        <strong>Cookies</strong> means small files that are placed on Your computer, mobile device or
                        any other device by a website, containing details of your browsing history on that website among
                        its many uses.
                    </li>

                    <li className="ml-8 list-disc">
                        <strong>Website</strong> refers to Snap Share, accessible from{" "}
                        <a
                            className="underline dark:text-primary1 text-blue-600"
                            href="https://snap-share-78f51.web.app/"
                            rel="noreferrer"
                            target="_blank"
                        >
                            https://snap-share-78f51.web.app/
                        </a>
                    </li>

                    <li className="ml-8 list-disc">
                        <strong>You</strong> means the individual accessing or using the Website, or a company, or any
                        legal entity on behalf of which such individual is accessing or using the Website, as
                        applicable."external nofollow noopener noreferrer"
                    </li>
                </ul>
                <h1 className="dark:text-primary1 text-blue-600 text-[2rem] mt-4 font-bold">The use of the Cookies</h1>
                <h2 className="text-[1.6rem] font-semibold mt-2">Type of Cookies We Use</h2>
                <p className="my-1">
                    {" "}
                    rel="noreferrer" Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent
                    Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies
                    are deleted as soon as You close your web browser.
                </p>
                <p className="my-1">We use both session and persistent Cookies for the purposes set out below:</p>
                <ul className="flex flex-col gap-3">
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            <strong>Necessary / Essential Cookies</strong>
                        </p>
                        <p className="my-1">Type: Session Cookies</p>
                        <p className="my-1">Administered by: Us</p>
                        <p className="my-1">
                            Purpose: These Cookies are essential to provide You with services available through the
                            Website and to enable You to use some of its features. They help to authenticate users and
                            prevent fraudulent use of user accounts. Without these Cookies, the services that You have
                            asked for cannot be provided, and We only use these Cookies to provide You with those
                            services.
                        </p>
                    </li>
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            <strong>Functionality Cookies</strong>
                        </p>
                        <p className="my-1">Type: Persistent Cookies</p>
                        <p className="my-1">Administered by: Us</p>
                        <p className="my-1">
                            Purpose: These Cookies allow us to remember choices You make when You use the Website, such
                            as remembering your login details or language preference. The purpose of these Cookies is to
                            provide You with a more personal experience and to avoid You having to re-enter your
                            preferences every time You use the Website.
                        </p>
                    </li>
                </ul>
                <h2 className="text-[1.6rem] font-semibold mt-2">Your Choices Regarding Cookies</h2>
                <p className="my-1">
                    If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies
                    in your browser and then delete the Cookies saved in your browser associated with this website. You
                    may use this option for preventing the use of Cookies at any time.
                </p>
                <p className="my-1">
                    If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website
                    and some features may not function properly.
                </p>
                <p className="my-1">
                    If You'd like to delete Cookies or instruct your web browser to delete or refuse Cookies, please
                    visit the help pages of your web browser.
                </p>
                <ul className="flex flex-col gap-3">
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            For the Chrome web browser, please visit this page from Google:{" "}
                            <a
                                className="underline dark:text-primary1 text-blue-600"
                                href="https://support.google.com/accounts/answer/32050"
                                rel="noreferrer"
                                target="_blank"
                            >
                                https://support.google.com/accounts/answer/32050
                            </a>
                        </p>
                    </li>
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            For the Internet Explorer web browser, please visit this page from Microsoft:{" "}
                            <a
                                className="underline dark:text-primary1 text-blue-600"
                                href="http://support.microsoft.com/kb/278835"
                                rel="noreferrer"
                                target="_blank"
                            >
                                http://support.microsoft.com/kb/278835
                            </a>
                        </p>
                    </li>
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            For the Firefox web browser, please visit this page from Mozilla:{" "}
                            <a
                                className="underline dark:text-primary1 text-blue-600"
                                href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
                                rel="noreferrer"
                                target="_blank"
                            >
                                https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
                            </a>
                        </p>
                    </li>
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            For the Safari web browser, please visit this page from Apple:{" "}
                            <a
                                className="underline dark:text-primary1 text-blue-600"
                                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                                rel="noreferrer"
                                target="_blank"
                            >
                                https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                            </a>
                        </p>
                    </li>
                </ul>
                <p className="my-1">For any other web browser, please visit your web browser's official web pages.</p>
                <h2 className="text-[1.6rem] font-semibold mt-2">More Information about Cookies</h2>
                <p className="my-1">
                    You can learn more about cookies:{" "}
                    <a
                        className="underline dark:text-primary1 text-blue-600"
                        href="https://www.freeprivacypolicy.com/blog/cookies/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Cookies: What Do They Do?
                    </a>
                    .
                </p>
                <h2 className="text-[1.6rem] font-semibold mt-2">Contact Us</h2>
                <p className="my-1">If you have any questions about this Cookies Policy, You can contact us:</p>
                <ul className="flex flex-col gap-3">
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            By email:{" "}
                            <a
                                className="underline dark:text-primary1 text-blue-600"
                                href="mailto:support@snap-share-78f51.firebaseapp.com"
                            >
                                support@snap-share-78f51.firebaseapp.com
                            </a>
                        </p>
                    </li>
                    <li className="ml-8 list-disc">
                        <p className="my-1">
                            By phone number:{" "}
                            <a className="underline dark:text-primary1 text-blue-600" href="tel: +84399998943">
                                +84 399998943
                            </a>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CookiesPolicy;
