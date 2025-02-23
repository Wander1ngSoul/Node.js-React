import axios from "axios";
import { API_URL_NEWS } from "../utils/consts";

export const fetchNews = async () => {
    try {
        const response = await axios.get(API_URL_NEWS);
        return response.data;
    } catch (error) {
        console.log("Ошибка при загрузке новостей:", error);
        throw error;
    }
};

export const fetchNewsById = async (newsID) => {
    try {
        const response = await axios.get(`${API_URL_NEWS}/${newsID}`);
        return response.data;
    } catch (error) {
        console.log("Ошибка при загрузке новости:", error);
        throw error;
    }
};

export const createNews = async (newsData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(API_URL_NEWS, newsData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Ошибка при создании новости:", error);
        throw error;
    }
};

export const updateNews = async (newsID, newsData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL_NEWS}/${newsID}`, newsData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Ошибка при обновлении новости:", error);
        throw error;
    }
};

export const deleteNews = async (newsID) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL_NEWS}/${newsID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Ошибка при удалении новости:", error);
        throw error;
    }
};