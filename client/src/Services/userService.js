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