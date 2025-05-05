export const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await fetch("/api/auth/check", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Ошибка проверки авторизации");
        }
        return response.json();
    } catch (error) {
        console.error("Ошибка проверки авторизации:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userID');
        localStorage.removeItem('roleID');
        return null;
    }
};

export const fetchUserData = async (token) => {
    const response = await fetch("/api/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Ошибка при загрузке данных пользователя");
    }
    return response.json();
};