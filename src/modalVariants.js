export const modalVariants = {
    hidden: {
        scale: 0,
        opacity: 0,
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 200,
        },
    },
};
