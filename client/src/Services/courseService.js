import axios from "axios";
import { API_URL_COURSE } from '../utils/consts';

export const fetchCourses = async () => {
    try {
        const response = await axios.get(API_URL_COURSE);
        return response.data;
    } catch (error) {
        console.log("Ошибка при загрузке курсов:", error);
        throw error;
    }
};

export const fetchCourseByID = async (CourseID) => {
    try {
        const response = await axios.get(`${API_URL_COURSE}/${CourseID}`);
        return response.data;
    } catch (error) {
        console.log('Ошибка при загрузке курса:', error);
        throw error;
    }
};

export const createCourse = async (course) => {
    try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await axios.post(API_URL_COURSE, course, {
            headers: {
                Authorization: `Bearer ${token}` // Добавляем токен в заголовок
            }
        });
        return response.data;
    } catch (error) {
        console.log('Ошибка при создании курса:', error);
        throw error;
    }
};

export const updateCourse = async (CourseID, course) => {
    try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await axios.put(`${API_URL_COURSE}/${CourseID}`, course, {
            headers: {
                Authorization: `Bearer ${token}` // Добавляем токен в заголовок
            }
        });
        return response.data;
    } catch (error) {
        console.log('Ошибка при обновлении курса:', error);
        throw error;
    }
};

export const deleteCourse = async (CourseID) => {
    try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await axios.delete(`${API_URL_COURSE}/${CourseID}`, {
            headers: {
                Authorization: `Bearer ${token}` // Передаем токен в заголовке
            }
        });
        return response.data;
    } catch (error) {
        console.log('Ошибка при удалении курса:', error);
        throw error;
    }
};