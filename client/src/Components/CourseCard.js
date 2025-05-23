import React, { useContext, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Styles/Components/CourseCard.css';
import { COURSE_ROUTE, PAY_COURSE_ROUTE } from "../utils/consts";
import { Context } from '../index';
import { addToCard, deleteFromCard, fetchCart } from "../Services/cartService";

const CourseCard = ({ course, onDelete }) => {
    const { user } = useContext(Context);
    const [isInCart, setIsInCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkIfCourseIsInCart = async () => {
            if (user.isAuth) {
                try {
                    const cart = await fetchCart(user.user.userID);
                    const isCourseInCart = cart.some(item => item.CourseID === course.CourseID);
                    setIsInCart(isCourseInCart);
                } catch (error) {
                    console.error("Ошибка при загрузке корзины: ", error);
                }
            }
        };

        checkIfCourseIsInCart();
    }, [user.isAuth, user.user.userID, course.CourseID]);

    const handleCourseClick = () => {
        navigate(`${COURSE_ROUTE}/${course.CourseID}`);
    };

    const handleBuy = (e) => {
        e.stopPropagation();
        try {
            if (user.isAuth) {
                navigate(PAY_COURSE_ROUTE, { state: { course } });
            } else {
                alert("Необходимо пройти авторизацию!");
            }
        } catch (error) {
            console.log("Ошибка при переходе к оплате: ", error);
        }
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        if (!user.isAuth) {
            alert("Необходимо авторизоваться!");
            return;
        }

        try {
            await addToCard(course.CourseID, user.user.userID);
            setIsInCart(true);
            alert(`Курс "${course.CourseName}" добавлен в корзину!`);
        } catch (error) {
            console.error("Ошибка при добавлении курса в корзину: ", error);
        }
    };

    const handleRemoveFromCart = async (e) => {
        e.stopPropagation();

        if (!user.isAuth) {
            alert("Необходимо авторизоваться!");
            return;
        }

        try {
            await deleteFromCard(course.CourseID, user.user.userID);
            setIsInCart(false);
            alert(`Курс "${course.CourseName}" удалён из корзины!`);
        } catch (error) {
            console.error("Ошибка при удалении курса из корзины: ", error);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/edit-course/${course.CourseID}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await onDelete(course.CourseID);
            alert('Курс успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении курса:', error);
        }
    };

    return (
        <Card className="course-card">
            <Card.Body>
                {/* Кликабельная область только для названия и описания */}
                <div onClick={handleCourseClick} style={{ cursor: 'pointer' }}>
                    <Card.Title className="card-title">{course.CourseName}</Card.Title>
                    <Card.Text className="card-description">
                        {course.Description}
                    </Card.Text>
                    <Card.Text className="price-text">
                        Цена: {course.Price} руб.
                    </Card.Text>
                </div>

                {/* Кнопки - здесь клик не приводит к переходу на страницу курса */}
                <div className="button-container">
                    <Button className="Btn-Pay" onClick={handleBuy}>
                        Купить
                    </Button>
                    {isInCart ? (
                        <Button className="Btn-RemoveFromCart" onClick={handleRemoveFromCart}>
                            Удалить из корзины
                        </Button>
                    ) : (
                        <Button className="Btn-AddToCart" onClick={handleAddToCart}>
                            Добавить в корзину
                        </Button>
                    )}
                    {user.user && user.user.roleID === 3 && (
                        <>
                            <Button className="Btn-Edit" onClick={handleEdit}>
                                Изменить курс
                            </Button>
                            <Button className="Btn-Delete" onClick={handleDelete}>
                                Удалить курс
                            </Button>
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;