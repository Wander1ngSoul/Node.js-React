import axios from 'axios';
import { API_URL_DISCUSSIONS } from "../utils/consts";

export const fetchDiscussions = async () => {
    try {
        const response = await axios.get(API_URL_DISCUSSIONS);
        return response.data;
    } catch (error) {
        console.log("Ошибка при загрузке обсуждений:", error);
        throw error;
    }
};

export const fetchDiscussionByID = async (DiscussionID) => {
    try {
        const response = await axios.get(`${API_URL_DISCUSSIONS}/${DiscussionID}`);
        return response.data;
    } catch (error) {
        console.log("Ошибка при загрузке обсуждения:", error);
        throw error;
    }
};

// Создание нового обсуждения
export const createDiscussion = async (discussionData) => {
    try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await axios.post(API_URL_DISCUSSIONS, discussionData, {
            headers: {
                Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            },
        });
        return response.data;
    } catch (error) {
        console.log("Ошибка при создании обсуждения:", error);
        throw error;
    }
};

// Редактирование обсуждения
export const updateDiscussion = async (discussionID, discussionData) => {
    try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await axios.put(`${API_URL_DISCUSSIONS}/${discussionID}`, discussionData, {
            headers: {
                Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            },
        });
        return response.data;
    } catch (error) {
        console.log("Ошибка при обновлении обсуждения:", error);
        throw error;
    }
};

// Удаление обсуждения
export const deleteDiscussion = async (discussionID) => {
    try {
        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        const response = await axios.delete(`${API_URL_DISCUSSIONS}/${discussionID}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            },
        });
        return response.data;
    } catch (error) {
        console.log("Ошибка при удалении обсуждения:", error);
        throw error;
    }
};