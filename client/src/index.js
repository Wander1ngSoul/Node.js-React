import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserCourses from "./Courses/UserCourses";

export const Context = createContext(null);

const userStore = new UserCourses();
userStore.checkAuth(); // Проверяем авторизацию при загрузке

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: userStore,
    }}>
        <App />
    </Context.Provider>
);