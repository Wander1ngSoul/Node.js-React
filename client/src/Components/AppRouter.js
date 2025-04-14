import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { Context } from '../index';
import {
    HOME_ROUTE,
    CART_ROUTE,
    NEWS_ROUTE,
    CREATE_NEWS_ROUTE,
    EDIT_NEWS_ROUTE,
    DISCUSSIONS_ROUTE,
    CREATE_DISCUSSION_ROUTE,
    EDIT_DISCUSSION_ROUTE,
    EDIT_COURSE_ROUTE,
    CREATE_COURSE_ROUTE
} from '../utils/consts';

import Home from '../Pages/StartPage/Home';
import CourseOne from '../Pages/Courses/CourseOne';
import Cart from '../Pages/Cart/Cart';
import News from '../Pages/News/News';
import CreateEditNews from '../Pages/News/Edit-News';
import Discussions from '../Pages/Discussions/DIscussions';
import CreateEditDiscussion from '../Pages/Discussions/EditDiscussion';
import EditCourse from '../Pages/Courses/Edit-Course'; // Импортируйте компонент для редактирования курса
import CreateCourse from '../Pages/Discussions/CreateCourse'

const AppRouter = () => {
    const { user } = useContext(Context);

    return (
        <Routes>
            {/* Публичные маршруты */}
            {publicRoutes.map(({ path, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={<Component />}
                    exact
                />
            ))}

            {/* Авторизованные маршруты */}
            {user.isAuth &&
                authRoutes.map(({ path, Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={<Component />}
                        exact
                    />
                ))}

            {/* Маршрут для корзины */}
            <Route
                path={`${CART_ROUTE}/:userID`}
                element={<Cart />}
                exact
            />

            {/* Маршрут для главной страницы */}
            <Route
                path={HOME_ROUTE}
                element={<Home />}
                exact
            >
                {/* Вложенный маршрут для отдельного курса */}
                <Route path=":id" element={<CourseOne />} />
            </Route>

            {/* Маршрут для новостей */}
            <Route
                path={NEWS_ROUTE}
                element={<News />}
                exact
            />

            {/* Маршрут для создания новости */}
            <Route
                path={CREATE_NEWS_ROUTE}
                element={<CreateEditNews />}
                exact
            />

            {/* Маршрут для редактирования новости */}
            <Route
                path={`${EDIT_NEWS_ROUTE}/:id`}
                element={<CreateEditNews />}
                exact
            />

            {/* Маршрут для обсуждений */}
            <Route
                path={DISCUSSIONS_ROUTE}
                element={<Discussions />}
                exact
            />

            {/* Маршрут для создания обсуждения */}
            <Route
                path={CREATE_DISCUSSION_ROUTE}
                element={<CreateEditDiscussion />}
                exact
            />

            {/* Маршрут для редактирования обсуждения */}
            <Route
                path={`${EDIT_DISCUSSION_ROUTE}/:id`}
                element={<CreateEditDiscussion />}
                exact
            />

            {/* Маршрут для редактирования курса */}
            <Route
                path={`${EDIT_COURSE_ROUTE}/:CourseID`}
                element={<EditCourse />}
                exact
            />
            <Route
                path={`${CREATE_COURSE_ROUTE}`}
                element={<CreateCourse />}
                exact
            />
        </Routes>
    );
};

export default AppRouter;