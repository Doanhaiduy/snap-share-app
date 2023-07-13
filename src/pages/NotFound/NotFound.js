import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MultiLanguageContext } from "~/Context/MultiLanguageContextProvider";

function NotFound({ title }) {
    const { t } = useContext(MultiLanguageContext);
    useEffect(() => {
        document.title = `${title} | SnapShare`;
    }, [title]);
    return (
        <section className=" bg-slate-200 dark:bg-[#333] py-[80px] h-[100vh] lg:col-span-4 col-span-5">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <img
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
                        className="h-[200px] mx-auto"
                        alt=""
                    />
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600  dark:text-primary5">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-[#000] dark:text-primary5 md:text-4xl ">
                        {t("pageError.404.title")}
                    </p>
                    <p className="mb-4 text-lg font-light text-[#000] dark:text-primary5">{t("pageError.404.desc")}</p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-500 dark:bg-primary1 dark:text-primary2 rounded-lg h-[40px]"
                    >
                        {t("pageError.button")}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
