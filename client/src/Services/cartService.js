import axios from 'axios';
import { API_URL_CART } from "../utils/consts";
import {fetchCourseByID} from "./courseService";

export const fetchCart = async (userID) => {
    try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await axios.get(`${API_URL_CART}/${userID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.log("Ошибка при загрузке корзины: ", error);
        throw error;
    }
};

export const addToCard = async (courseID, userID) => {
    try {

        const token = localStorage.getItem('token');
        const data = {
            CourseID: courseID,
            UserID: userID,
            AddedDate: new Date().toISOString(),
        }

        const response = await axios.post(`${API_URL_CART}/${userID}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data;
    }
    catch (error) {
        console.log("Ошибка при добавлении курса в корзину: ", error);
        throw error;
    }
}


export const deleteFromCard = async (courseID, userID) => {
    try {
        const token = localStorage.getItem('token');
        const numericUserID = parseInt(userID, 10); // Преобразуем в число
        const numericCourseID = parseInt(courseID, 10); // Преобразуем в число

        if (isNaN(numericUserID) || isNaN(numericCourseID)) {
            throw new Error("Некорректные параметры userID или courseID");
        }

        const response = await axios.delete(`${API_URL_CART}/${numericUserID}/${numericCourseID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Ошибка при удалении курса: ", error);
        throw error;
    }
};

