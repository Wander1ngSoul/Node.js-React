import React, { useEffect, useState, useContext } from 'react';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
import { fetchDiscussions, deleteDiscussion } from '../Services/discussionsService';
import { Context } from '../index';
import { Button } from "react-bootstrap"; // Импортируем Button из React Bootstrap
=======
import { useNavigate } from 'react-router-dom';
import { fetchDiscussions, deleteDiscussion } from '../Services/discussionsService';
import { Context } from '../index';
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
import '../Styles/Pages/Discussions.css';

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(Context);

    useEffect(() => {
        const getDiscussions = async () => {
            try {
                const data = await fetchDiscussions();
                setDiscussions(data || []);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        getDiscussions();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'Дата не указана';
        const date = new Date(dateString);
        return isNaN(date) ? 'Некорректная дата' : date.toLocaleDateString();
    };

    const handleDelete = async (discussionId) => {
<<<<<<< HEAD
=======
        // Подтверждение перед удалением
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
        const isConfirmed = window.confirm('Вы уверены, что хотите удалить это обсуждение?');

        if (isConfirmed) {
            try {
                await deleteDiscussion(discussionId);
                const updatedDiscussions = discussions.filter(
                    (discussion) => discussion.DiscussionID !== discussionId
                );
                setDiscussions(updatedDiscussions);
                console.log('Обсуждение успешно удалено');
            } catch (error) {
                console.error('Ошибка при удалении обсуждения:', error);
                setError('Не удалось удалить обсуждение');
            }
        }
    };

    const handleEdit = (discussionId) => {
        navigate(`/edit-discussion/${discussionId}`);
    };

    const handleCreate = () => {
        navigate('/create-discussion');
    };

    if (loading) {
        return <div className="loading">Загрузка обсуждений...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <div className="discussions-container">
<<<<<<< HEAD
            <Button
                variant="outline-secondary" // Изменяем на стиль кнопки из Bootstrap
                onClick={() => navigate(-1)}

            >
                Назад
            </Button>

            <h1 className="discussions-title">Обсуждения</h1>

            {user.user && user.user.roleID === 2 && (
                <Button
                    variant="success"
=======
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Назад
            </button>

            <h1 className="discussions-title">Обсуждения</h1>

            {/* Кнопка "Создать обсуждение" для администратора */}
            {user.user && user.user.roleID === 3 && (
                <button
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                    className="create-discussion-button"
                    onClick={handleCreate}
                >
                    Создать обсуждение
<<<<<<< HEAD
                </Button>
=======
                </button>
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
            )}

            <div className="discussions-list">
                {discussions && discussions.length > 0 ? (
                    discussions.map((discussion) => (
                        <div key={discussion.DiscussionID} className="discussion-block">
                            <div className="discussion-item">
                                <h2 className="discussion-item-title">{discussion.Title}</h2>
                                <p className="discussion-item-content">{discussion.Content}</p>
                                <div className="discussion-item-footer">
                                    <span>Автор: {discussion.CreatedBy || 'Не указан'}</span>
                                    <span>Дата: {formatDate(discussion.CreatedDate)}</span>
                                    <div className="buttons-container">
<<<<<<< HEAD
                                        <Button
=======
                                        <button
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                                            className="discussion-button"
                                            onClick={() => navigate(`/discussions/${discussion.DiscussionID}`)}
                                        >
                                            Перейти к обсуждению
<<<<<<< HEAD
                                        </Button>
                                        {user.user && user.user.roleID === 2 && (
                                            <>
                                                <Button
=======
                                        </button>
                                        {user.user && user.user.roleID === 3 && (
                                            <>
                                                <button
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                                                    className="edit-button"
                                                    onClick={() => handleEdit(discussion.DiscussionID)}
                                                >
                                                    Редактировать
<<<<<<< HEAD
                                                </Button>
                                                <Button
=======
                                                </button>
                                                <button
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                                                    className="delete-button"
                                                    onClick={() => handleDelete(discussion.DiscussionID)}
                                                >
                                                    Удалить
<<<<<<< HEAD
                                                </Button>
=======
                                                </button>
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-discussions">Нет доступных обсуждений.</div>
                )}
            </div>
<<<<<<< HEAD
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Журнал Психологии. Все права защищены.</p>
                    <div className="footer-links">
                        <Link to="/privacy-policy" className="footer-link">Политика конфиденциальности</Link>
                        <Link to="/terms-of-use" className="footer-link">Условия использования</Link>
                        <Link to="/contact-us" className="footer-link">Свяжитесь с нами</Link>
                    </div>
=======

            {/* Футер */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2023 Обсуждения. Все права защищены.</p>
                    <p>Свяжитесь с нами: support@discussions.com</p>
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                </div>
            </footer>
        </div>
    );
};

<<<<<<< HEAD
export default Discussions;
=======
export default Discussions;
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
