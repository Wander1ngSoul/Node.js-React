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
        return <div>Курс не найден</div>;
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
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
            alert('Оплата успешно прошла (симуляция)');

            // Удаление курса из корзины после оплаты
            if (user?.user?.userID) {
                try {
                    await deleteFromCard(course.CourseID, user.user.userID);
                    console.log('Курс успешно удален из корзины после оплаты');
                } catch (error) {
                    console.error('Ошибка при удалении курса из корзины после оплаты:', error);
                }
            }

        }
    };

    return (
        <div className="pay-page">
            <h1>Оплата курса: {course.CourseName}</h1>
            <p>Цена: {course.Price} руб.</p>

            <form className="payment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Имя владельца карты</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label>Номер карты</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        maxLength="16"
                    />
                    {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Срок действия (MM/YY)</label>
                        <input
                            type="text"
                            name="expiry"
                            value={form.expiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            maxLength="5"
                        />
                        {errors.expiry && <div className="error">{errors.expiry}</div>}
                    </div>

                    <div className="form-group">
                        <label>CVC</label>
                        <input
                            type="text"
                            name="cvc"
                            value={form.cvc}
                            onChange={handleChange}
                            maxLength="3"
                        />
                        {errors.cvc && <div className="error">{errors.cvc}</div>}
                    </div>
                </div>

                <button type="submit" className="pay-button">
                    Оплатить
                </button>
            </form>

            {submitted && <p className="success">Спасибо за покупку!</p>}
        </div>
    );
};

export default CoursePayPage;
