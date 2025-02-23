import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { deleteFromCard, fetchCart } from "../Services/cartService";
import { Context } from "../index";
import '../Styles/Pages/Cart.css';

const Cart = () => {
    const [cartList, setCartList] = useState([]);
    const { user } = useContext(Context);
    const { userID } = useParams();

    useEffect(() => {
        if (!userID) {
            console.error("UserID не определён");
            return;
        }

        const loadCart = async () => {
            try {
                if (user.isAuth && userID) {
                    const data = await fetchCart(userID);
                    setCartList(data);
                }
            } catch (error) {
                console.error("Ошибка при загрузке корзины пользователя: ", error);
            }
        };

        loadCart();
    }, [user.isAuth, userID]);

    if (!user.isAuth) {
        return <Navigate to="/login" />;
    }

    const totalPrice = cartList.reduce((total, item) => total + (item.course?.Price || 0), 0);

    const handleDelete = async (courseID) => {
        try {
            await deleteFromCard(courseID, user.user.userID);
            const updateCart = cartList.filter(item => item.CourseID !== courseID);
            setCartList(updateCart);
            alert("Курс удален из корзины!");
        } catch (error) {
            console.log("Ошибка при удалении курса из корзины: ", error);
            alert("Не удалось удалить курс из корзины");
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-header">Корзина</div>
            {cartList.length > 0 ? (
                <>
                    {cartList.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="cart-item-info">
                                <div className="cart-item-name">Курс: {item.course?.CourseName}</div>
                                <div className="cart-item-price">Стоимость: {item.course?.Price}</div>
                                <div className="cart-item-date">Добавлено: {new Date(item.AddedDate).toLocaleDateString()}</div>
                            </div>
                            <button className="cart-item-delete" onClick={() => handleDelete(item.CourseID)}>
                                Удалить
                            </button>
                        </div>
                    ))}
                    <div className="cart-total">Итого: {totalPrice.toFixed(2)}</div>
                </>
            ) : (
                <div className="cart-empty">Корзина пуста</div>
            )}
        </div>
    );
};

export default Cart;