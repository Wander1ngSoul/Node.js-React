import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import { deleteFromCard } from '../../Services/cartService';
import '../../Styles/Pages/Courses/PayCoursePage.css';

const CoursePayPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { course } = location.state || {};
    const { user } = useContext(Context);

    const [form, setForm] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    if (!course) {
        return <div className="error-message">Курс не найден</div>;
    }

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = 'Введите имя владельца карты';
        if (!/^\d{16}$/.test(form.cardNumber)) newErrors.cardNumber = 'Номер карты должен содержать 16 цифр';
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) newErrors.expiry = 'Формат срока действия должен быть MM/YY';
        if (!/^\d{3}$/.test(form.cvc)) newErrors.cvc = 'CVC должен содержать 3 цифры';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Форматирование срока действия карты
        if (name === 'expiry') {
            const formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .substring(0, 5);
            setForm(prev => ({ ...prev, [name]: formattedValue }));
            return;
        }

        // Ограничение только цифрами для номерных полей
        if (name === 'cardNumber' || name === 'cvc') {
            const digitsOnly = value.replace(/\D/g, '');
            setForm(prev => ({ ...prev, [name]: digitsOnly }));
            return;
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setSubmitted(true);

            // Симуляция успешной оплаты
            alert('Оплата успешно прошла (симуляция)');

            // Удаление курса из корзины после оплаты
            if (user?.user?.userID && course?.CourseID) {
                try {
                    await deleteFromCard(course.CourseID, user.user.userID);
                    console.log('Курс успешно удален из корзины после оплаты');

                    // Перенаправление через 2 секунды
                    setTimeout(() => {
                        navigate('/my-courses');
                    }, 2000);

                } catch (error) {
                    console.error('Ошибка при удалении курса из корзины:', error);
                    setSubmitted(false);

                    // Показываем более информативное сообщение об ошибке
                    if (error.response) {
                        // Ошибка от сервера
                        alert(`Ошибка: ${error.response.data.message || 'Не удалось обработать платеж'}`);
                    } else {
                        alert('Произошла ошибка при соединении с сервером');
                    }
                }
            } else {
                console.error('Отсутствуют необходимые данные для удаления из корзины');
                setSubmitted(false);
                alert('Произошла ошибка при обработке платежа');
            }
        } catch (error) {
            console.error('Неожиданная ошибка:', error);
            setSubmitted(false);
            alert('Произошла непредвиденная ошибка');
        }
    };

    return (
        <div className="pay-page">
            <div className="pay-page-container">
                <h1>Оплата курса: {course.CourseName}</h1>
                <p className="course-price">Цена: {course.Price} руб.</p>

                <form className="payment-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Имя владельца карты</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Как на карте"
                            className={errors.name ? 'input-error' : ''}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label>Номер карты</label>
                        <div className="card-number-input">
                            <input
                                type="text"
                                name="cardNumber"
                                value={form.cardNumber}
                                onChange={handleChange}
                                placeholder="0000 0000 0000 0000"
                                maxLength="16"
                                className={errors.cardNumber ? 'input-error' : ''}
                            />
                            <div className="card-icons">
                                <span className="card-icon visa">VISA</span>
                                <span className="card-icon mastercard">MC</span>
                            </div>
                        </div>
                        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group expiry-group">
                            <label>Срок действия</label>
                            <input
                                type="text"
                                name="expiry"
                                value={form.expiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                maxLength="5"
                                className={errors.expiry ? 'input-error' : ''}
                            />
                            {errors.expiry && <span className="error">{errors.expiry}</span>}
                        </div>

                        <div className="form-group cvc-group">
                            <label>CVC</label>
                            <div className="cvc-input">
                                <input
                                    type="text"
                                    name="cvc"
                                    value={form.cvc}
                                    onChange={handleChange}
                                    placeholder="123"
                                    maxLength="3"
                                    className={errors.cvc ? 'input-error' : ''}
                                />
                                <span className="cvc-hint">3 цифры на обороте</span>
                            </div>
                            {errors.cvc && <span className="error">{errors.cvc}</span>}
                        </div>
                    </div>

                    <button type="submit" className="pay-button" disabled={submitted}>
                        {submitted ? 'Обработка...' : `Оплатить ${course.Price} руб.`}
                    </button>
                </form>

                {submitted && (
                    <div className="success-message">
                        <p>Спасибо за покупку!</p>
                        <p>Перенаправляем вас на страницу курсов...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursePayPage;