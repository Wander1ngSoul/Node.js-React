import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { createNews, updateNews, fetchNewsById } from '../Services/newsService';
import { Context } from '../index';

const CreateEditNews = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useContext(Context);

    useEffect(() => {
        if (id) {
            const loadNews = async () => {
                try {
                    const news = await fetchNewsById(id);
                    setTitle(news.Title);
                    setContent(news.Content);
                } catch (error) {
                    console.error('Ошибка при загрузке новости:', error);
                }
            };
            loadNews();
        }
    }, [id]);



    const handleSubmit = async (e) => {
        e.preventDefault();



        const newsData = {
            Title: title,
            Content: content,
            CreatedBy: user.user.userID,
        };

        try {
            if (id) {
                await updateNews(id, newsData);
                alert('Новость успешно обновлена!');
            } else {
                await createNews(newsData);
                alert('Новость успешно создана!');
            }
            navigate('/news');
        } catch (error) {
            console.error('Ошибка при сохранении новости:', error);
            alert('Не удалось сохранить новость.');
        }
    };

    return (
        <Container className="mt-4">
            <h1>{id ? 'Редактировать новость' : 'Создать новость'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Заголовок</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Содержание</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {id ? 'Сохранить изменения' : 'Создать новость'}
                </Button>
            </Form>
        </Container>
    );
};

export default CreateEditNews;