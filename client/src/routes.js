import {
    ADMIN_ROUTE,
    CART_ROUTE,
    COURSE_ROUTE,
    COURSES_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    NEWS_ROUTE,
    DISCUSSIONS_ROUTE,
} from "./utils/consts";

import Admin from './Pages/Admin';
import Cart from './Pages/Cart';
import Courses from './Pages/Courses';
import Auth from './Pages/Auth';
import CourseOne from './Pages/CourseOne';
import News from './Pages/News';
import Discussions from "./Pages/DIscussions";
import DiscussionsOne from "./Pages/DiscussionsOne";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE + '/:userID',
        Component: Cart
    },
];

export const publicRoutes = [
    {
        path: COURSES_ROUTE,
        Component: Courses
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: COURSE_ROUTE + '/:id',
        Component: CourseOne
    },
    {
        path: NEWS_ROUTE,
        Component: News
    },
    {
        path: DISCUSSIONS_ROUTE,
        Component: Discussions
    },
    {
        path: DISCUSSIONS_ROUTE + '/:discussionId',
        Component: DiscussionsOne
    }
];