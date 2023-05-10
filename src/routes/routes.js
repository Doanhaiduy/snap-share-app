import config from "~/config";
// Layout

// Pages
import Home from "../pages/Home/Home";
import PostImage from "../pages/PostImage/PostImage";
import Profile from "../pages/Profile/Profile";
//public routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        title: "Home",
    },
    {
        path: config.routes.postImage,
        component: PostImage,
        title: "Post Image",
    },
    {
        path: config.routes.profile,
        component: Profile,
        title: "Profile",
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
