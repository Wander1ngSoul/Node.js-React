import axios from "axios";
import { API_URL_REGISTRATION_USER } from "../utils/consts";

export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL_REGISTRATION_USER, userData);
        return response.data;
    } catch (error) {
        console.log("Ошибка при регистрации пользователя:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Не удалось добавить пользователя. Пожалуйста, попробуйте позже.");
    }
};