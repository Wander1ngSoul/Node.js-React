import {
    ADMIN_ROUTE,
    CART_ROUTE,
    COURSE_ROUTE,
    COURSES_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    NEWS_ROUTE,
    DISCUSSIONS_ROUTE,
    STRESS_PAGE_ROUTE,
    EMOTIONALINTELLIGENCE_ROUTE,
    SLEEPANDMENTALHEALTH_ROUTE
} from "./utils/consts";

import Admin from './Pages/StartPage/Admin';
import Cart from './Pages/Cart/Cart';
import Courses from './Pages/Courses/Courses';
import Auth from './Pages/StartPage/Auth';
import CourseOne from './Pages/Courses/CourseOne';
import News from './Pages/News/News';
import Discussions from "./Pages/Discussions/DIscussions";
import DiscussionsOne from "./Pages/Discussions/DiscussionsOne";
import Topic_Stress from "./Pages/Selected_articles/Topic_Stress";
import EmotionalIntelligence from "./Pages/Selected_articles/EmotionalIntelligence";
import mentalHealth from "./Pages/Selected_articles/MentalHealth";

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
    },
    {
        path: STRESS_PAGE_ROUTE,
        Component: Topic_Stress
    },
    {
        path: EMOTIONALINTELLIGENCE_ROUTE,
        Component:EmotionalIntelligence
    },
    {
        path: SLEEPANDMENTALHEALTH_ROUTE,
        Component: mentalHealth
    }
];