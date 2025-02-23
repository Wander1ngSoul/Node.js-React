import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
import '../Styles/Pages/News.css';
import { fetchNews, deleteNews } from "../Services/newsService";
import { Context } from '../index';

const News = () => {
    const [newsList, setNewsList] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(Context);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await fetchNews();
                setNewsList(data);
            } catch (error) {
                console.log('Ошибка при загрузке новостей:', error);
            }
        };
        loadNews();
    }, []);

    const handleEdit = (newsID) => {
        navigate(`/edit-news/${newsID}`);
    };

    const handleDelete = async (newsID) => {
        if (window.confirm("Вы уверены, что хотите удалить эту новость?")) {
            try {
                await deleteNews(newsID);
                const updatedNews = newsList.filter(item => item.NewsID !== newsID);
                setNewsList(updatedNews);
                alert("Новость успешно удалена!");
            } catch (error) {
                console.error("Ошибка при удалении новости: ", error);
                alert("Не удалось удалить новость. Проверьте авторизацию и права доступа.");
            }
        }
    };

    const handleCreate = () => {
        navigate('/create-news');
    };

    return (
<<<<<<< HEAD
        <div className="news-page">
            <Container className="news-container">
                <Row className="align-items-center mb-4">
                    <Col xs="auto">
                        <Button
                            variant="outline-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Назад
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <h1 className="news-title">Новости психологии</h1>
                    </Col>
                </Row>

                {user.user && user.user.roleID === 2 && (
                    <Button
                        variant="success"
                        className="mb-4"
                        onClick={handleCreate}
                    >
                        Создать новость
                    </Button>
                )}

                <Row>
                    {newsList.map((item) => (
                        <Col key={item.NewsID} xs={12} className="news-block mb-4">
                            <div className="news-item">
                                <h2 className="news-item-title">{item.Title}</h2>
                                <p className="news-item-content">{item.Content}</p>
                                <div className="news-item-footer">
                                    <small className="text-muted">
                                        Опубликовано: {new Date(item.CreatedDate).toLocaleDateString()}
                                    </small>
                                    {user.user && user.user.roleID === 2 && (
                                        <div className="admin-buttons">
                                            <Button
                                                variant="warning"
                                                className="me-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(item.NewsID);
                                                }}
                                            >
                                                Изменить
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(item.NewsID);
                                                }}
                                            >
                                                Удалить
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

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
=======
        <Container className="news-container">
            <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="mb-4"
            >
                Назад
            </Button>

            <h1 className="news-title">Новости психологии</h1>

            {user.user && user.user.roleID === 3 && (
                <Button
                    variant="success"
                    className="mb-4"
                    onClick={handleCreate}
                >
                    Создать новость
                </Button>
            )}

            <Row>
                {newsList.map((item) => (
                    <Col key={item.NewsID} xs={12} className="news-block mb-4">
                        <div className="news-item">
                            <h2 className="news-item-title">{item.Title}</h2>
                            <p className="news-item-content">{item.Content}</p>
                            <div className="news-item-footer">
                                <small className="text-muted">
                                    Опубликовано: {new Date(item.CreatedDate).toLocaleDateString()}
                                </small>
                                {user.user && user.user.roleID === 3 && (
                                    <div className="admin-buttons">
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(item.NewsID);
                                            }}
                                        >
                                            Изменить
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(item.NewsID);
                                            }}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
    );
};

export default News;