<<<<<<< HEAD
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseByID } from "../Services/courseService";
import { addToCard, deleteFromCard, fetchCart } from "../Services/cartService";
import { Context } from "../index";
import "../Styles/Pages/CourseOne.css";

const CourseOne = () => {
    const { id } = useParams();
    const CourseID = parseInt(id);
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInCart, setIsInCart] = useState(false);
=======
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseByID } from "../Services/courseService";
import '../Styles/Pages/CourseOne.css';

const CourseOne = () => {
    const params = useParams();
    const CourseID = parseInt(params.id);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910

    useEffect(() => {
        const loadCourse = async () => {
            try {
                const foundCourse = await fetchCourseByID(CourseID);
                if (foundCourse) {
                    setCourse(foundCourse);
<<<<<<< HEAD
                    if (user.isAuth) {
                        const cart = await fetchCart(user.user.userID);
                        setIsInCart(cart.some(item => item.CourseID === CourseID));
                    }
                } else {
                    setError("Курс не найден");
                }
            } catch {
                setError("Ошибка при загрузке курса");
=======
                } else {
                    console.error("Курс не найден");
                    setError("Курс не найден");
                }
            } catch (error) {
                console.error("Ошибка при загрузке курса:", error);
                setError("Не удалось загрузить курс");
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
            } finally {
                setLoading(false);
            }
        };
<<<<<<< HEAD
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


=======

        loadCourse();
    }, [CourseID]);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!course) {
        return <div className="not-found">Курс не найден</div>;
    }

    return (
        <div className="course-container">
            <div className="course-header">
                <h1 className="course-title">{course.CourseName}</h1>
                <p className="course-price">Цена: {course.Price} руб.</p>
            </div>
            <div className="course-content">
                <p className="course-description">{course.Description}</p>
                <button className="enroll-button">Записаться на курс</button>
            </div>
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
        </div>
    );
};

<<<<<<< HEAD
export default CourseOne;
=======
export default CourseOne;
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
