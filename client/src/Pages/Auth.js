import React, { useState, useContext } from 'react';
import { Button, Card, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "../utils/consts";
import { createUser } from "../Services/RegistrationService";
import { loginUser } from "../Services/loginService";
import { Context } from "../index";
import '../Styles/Pages/Auth.css';

const Auth = () => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Пользователь'
    });
    const [errors, setErrors] = useState({});

    const handleButtonClick = () => {
        navigate(isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin && !formData.username.trim()) newErrors.username = 'Имя пользователя обязательно';
        if (!isLogin && !formData.email.trim()) newErrors.email = 'Email обязателен';
        if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Некорректный формат email';
        if (!formData.password.trim()) newErrors.password = 'Пароль обязателен';
        if (formData.password.length < 8) newErrors.password = 'Пароль должен быть не менее 8 символов';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const now = new Date();
        const registrationDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const roleToRoleID = {
            "Пользователь": 1,
            "Редактор": 2,
            "Администратор": 3
        };

        const userData = isLogin
            ? { Email: formData.email, Password: formData.password }
            : {
                Username: formData.username,
                Email: formData.email,
                Password: formData.password,
                RegistrationDate: registrationDate,
                RoleID: roleToRoleID[formData.role] || 1
            };

        try {
            const result = isLogin
                ? await loginUser(userData)
                : await createUser(userData);

            alert(isLogin ? 'Успешный вход!' : 'Успешно зарегистрировано!');
            console.log(isLogin ? 'Пользователь успешно вошел:' : 'Пользователь успешно создан:', result);

            localStorage.setItem('token', result.token);
            localStorage.setItem('username', result.username);
            localStorage.setItem('userID', result.userID);
            localStorage.setItem('roleID', result.roleID);


            user.setIsAuth(true);
            user.setUser({ username: result.username, userID: result.userID, roleID: result.roleID });

            navigate(HOME_ROUTE);
        } catch (error) {
            console.error("Ошибка: ", error.message);
            alert(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <Container className="auth-container">
            <Card className="auth-card">
                <h2 className="auth-title">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <Form.Group className="auth-form-group">
                            <Form.Control
                                className={`auth-input ${errors.username ? 'is-invalid' : ''}`}
                                placeholder="Имя пользователя..."
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </Form.Group>
                    )}

                    <Form.Group className="auth-form-group">
                        <Form.Control
                            className={`auth-input ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Введите Email..."
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </Form.Group>

                    <Form.Group className="auth-form-group">
                        <Form.Control
                            className={`auth-input ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Введите Пароль..."
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </Form.Group>

                    {!isLogin && (
                        <Form.Group className="auth-form-group">
                            <Form.Label>Роль</Form.Label>
                            <Form.Select
                                className="auth-input"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="Пользователь">Пользователь</option>
                                <option value="Редактор">Редактор</option>
                            </Form.Select>
                        </Form.Group>
                    )}

                    <Button className="auth-button" type="submit">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>

                    <div className="auth-switch" onClick={handleButtonClick}>
                        {isLogin ? (
                            <span> <u>Нет аккаунта?</u></span>
                        ) : (
                            <span><u>Есть аккаунт?</u></span>
                        )}
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;