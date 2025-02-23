import axios from "axios";
import { API_URL_LOGIN_USER } from "../utils/consts";

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(API_URL_LOGIN_USER, userData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Не удалось войти. Пожалуйста, попробуйте позже.";
        console.log("Ошибка при входе пользователя:", errorMessage);
        throw new Error(errorMessage);
    }
};