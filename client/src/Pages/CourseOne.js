import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseByID } from "../Services/courseService";
import '../Styles/Pages/CourseOne.css';
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {fetchCart} from "../Services/cartService";
import {deleteFromCard} from "../Services/cartService";
import {addToCard} from "../Services/cartService";
import {Context} from "../index"

const CourseOne = () => {
    const params = useParams();
    const CourseID = parseInt(params.id);
    const navigate = useNavigate();

    const { user } = useContext(Context);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const foundCourse = await fetchCourseByID(CourseID);
                if (foundCourse) {
                    setCourse(foundCourse);

                    if (user.isAuth) {
                        const cart = await fetchCart(user.user.userID);
                        setIsInCart(cart.some(item => item.CourseID === CourseID));
                    }
                } else {
                    setError("Курс не найден");
                }
            } catch (error) {
                console.error("Ошибка при загрузке курса:", error);
                setError("Не удалось загрузить курс");
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [CourseID, user.isAuth, user.user.userID]);

    const handleCartToggle = async () => {
        if (!user.isAuth) {
            alert("Необходимо авторизоваться!");
            return;
        }

        try {
            if (isInCart) {
                await deleteFromCard(CourseID, user.user.userID);
                alert(`Курс "${course.CourseName}" удалён из корзины!`);
            } else {
                await addToCard(CourseID, user.user.userID);
                alert(`Курс "${course.CourseName}" добавлен в корзину!`);
            }
            setIsInCart(!isInCart);
        } catch (error) {
            console.error("Ошибка при изменении статуса корзины:", error);
        }
    };

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!course) return <div className="not-found">Курс не найден</div>;

    return (
        <div className="course-page">
            <button className="back-button" onClick={() => navigate(-1)}>← Вернуться</button>

            <div className="course-card">
                <h1 className="course-title">{course.CourseName}</h1>
                <p className="course-price">{course.Price} руб.</p>
                <div className="course-details">
                    <h2>О курсе</h2>
                    <p className="course-description">{course.Description}</p>
                </div>

                <button className="cart-button" onClick={handleCartToggle}>
                    {isInCart ? "Удалить из корзины" : "Добавить в корзину"}
                </button>
            </div>
        </div>
    );
};

export default CourseOne;
