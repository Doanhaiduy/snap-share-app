import config from "~/config";
import Admin from "~/pages/Admin/Admin";
// Layout

// Pages
import Home from "~/pages/Home/Home";
import Language from "~/pages/Language/Language";
import NotFound from "~/pages/NotFound/NotFound";
import Profile from "~/pages/Profile/Profile";
import Auth from "~/Components/Auth/Auth";

//public routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        title: "Home",
    },

    {
        path: config.routes.profile,
        component: Profile,
        title: "Profile",
    },
    {
        path: config.routes.admin,
        component: Admin,
        title: "Admin",
    },
    {
        path: config.routes.language,
        component: Language,
        title: "Language",
    },
    {
        path: config.routes.notFound,
        component: NotFound,
        title: "Not Found",
    },
];

const privateRoutes = [
    {
        path: config.routes.auth,
        component: Auth,
        title: "Login",
    },
];

export { publicRoutes, privateRoutes };
