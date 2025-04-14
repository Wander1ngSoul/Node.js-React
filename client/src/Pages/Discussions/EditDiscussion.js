import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDiscussion, updateDiscussion, fetchDiscussionByID } from '../../Services/discussionsService';
import { Context } from '../../index';

const CreateEditDiscussion = () => {
    const { id } = useParams(); // Получаем ID обсуждения, если редактируем
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useContext(Context);

    useEffect(() => {
        if (id) {
            // Если есть ID, загружаем данные обсуждения для редактирования
            const loadDiscussion = async () => {
                try {
                    const discussion = await fetchDiscussionByID(id);
                    setTitle(discussion.Title);
                    setContent(discussion.Content);
                } catch (error) {
                    console.error('Ошибка при загрузке обсуждения:', error);
                }
            };
            loadDiscussion();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const discussionData = {
            Title: title,
            Content: content,
            CreatedBy: user.user.userID, // ID пользователя, создающего обсуждение
        };

        try {
            if (id) {
                // Редактирование существующего обсуждения
                await updateDiscussion(id, discussionData);
                alert('Обсуждение успешно обновлено!');
            } else {
                // Создание нового обсуждения
                await createDiscussion(discussionData);
                alert('Обсуждение успешно создано!');
            }
            navigate('/discussions'); // Возвращаемся на страницу с обсуждениями
        } catch (error) {
            console.error('Ошибка при сохранении обсуждения:', error);
            alert('Не удалось сохранить обсуждение.');
        }
    };

    return (
        <div className="create-edit-discussion-container">
            <h1>{id ? 'Редактировать обсуждение' : 'Создать обсуждение'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Заголовок:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Содержание:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {id ? 'Сохранить изменения' : 'Создать обсуждение'}
                </button>
            </form>
        </div>
    );
};

export default CreateEditDiscussion;