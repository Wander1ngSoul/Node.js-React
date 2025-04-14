import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchDiscussions, deleteDiscussion } from '../../Services/discussionsService';
import { Context } from '../../index';
import { Button } from "react-bootstrap";
import '../../Styles/Pages/Discussions/Discussions.css';

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
            <Button variant="outline-secondary" onClick={() => navigate(-1)}>Назад</Button>

            <h1 className="discussions-title">Обсуждения</h1>

            {user.user && user.user.roleID === 2 && (
                <Button
                    variant="success"
                    className="create-discussion-button"
                    onClick={handleCreate}
                >
                    Создать обсуждение
                </Button>
            )}

            <div className="discussions-list">
                {discussions.length > 0 ? (
                    discussions.map((discussion) => (
                        <div key={discussion.DiscussionID} className="discussion-block">
                            <div className="discussion-item">
                                <h2 className="discussion-item-title">{discussion.Title}</h2>
                                <p className="discussion-item-content">{discussion.Content}</p>
                                <div className="discussion-item-footer">
                                    <span>Автор: {discussion.CreatedBy || 'Не указан'}</span>
                                    <span>Дата: {formatDate(discussion.CreatedDate)}</span>
                                    <div className="buttons-container">
                                        <Button
                                            variant="primary"
                                            className="discussion-button"
                                            onClick={() => navigate(`/discussions/${discussion.DiscussionID}`)}
                                        >
                                            Перейти к обсуждению
                                        </Button>
                                        {user.user && user.user.roleID === 2 && (
                                            <>
                                                <Button
                                                    variant="warning"
                                                    className="edit-button"
                                                    onClick={() => handleEdit(discussion.DiscussionID)}
                                                >
                                                    Редактировать
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    className="delete-button"
                                                    onClick={() => handleDelete(discussion.DiscussionID)}
                                                >
                                                    Удалить
                                                </Button>
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

            <footer className="footer">
                <div className="footer-content">
                    <p>© 2024 Журнал Психологии. Все права защищены.</p>
                    <div className="footer-links">
                        <Link to="/privacy-policy" className="footer-link">Политика конфиденциальности</Link>
                        <Link to="/terms-of-use" className="footer-link">Условия использования</Link>
                        <Link to="/contact-us" className="footer-link">Свяжитесь с нами</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Discussions;
