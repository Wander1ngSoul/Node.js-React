import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDiscussionByID } from '../Services/discussionsService';
import { fetchComments, createComment, updateComment, deleteComment } from '../Services/commentService';
import { Context } from '../index';
import '../Styles/Pages/DiscussionOne.css';

const DiscussionsOne = () => {
    const { discussionId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(Context);

    const [discussion, setDiscussion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    // Загрузка обсуждения и комментариев
    useEffect(() => {
        const loadData = async () => {
            try {
                const foundDiscussion = await fetchDiscussionByID(discussionId);
                if (foundDiscussion) {
                    setDiscussion(foundDiscussion);
                } else {
                    setError("Обсуждение не найдено");
                }

                const commentsData = await fetchComments(discussionId);
                setComments(commentsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [discussionId]);

    const handleAddComment = async () => {
        if (newComment.trim() === '') {
            alert("Комментарий не может быть пустым");
            return;
        }

        try {
            const comment = {
                DiscussionID: Number(discussionId),
                UserID: user.user.userID,
                Content: newComment,
                Username: user.user.username,
            };

            const addedComment = await createComment(comment);
            setComments([addedComment, ...comments]);
            setNewComment('');
        } catch (err) {
            console.error("Ошибка при добавлении комментария:", err);
            console.error("Статус ошибки:", err.response?.status);
            console.error("Данные ошибки:", err.response?.data);
            alert("Не удалось добавить комментарий: " + (err.response?.data?.message || err.message));
        }
    };

    const handleEditComment = async (commentId) => {
        try {
            await updateComment(commentId, {
                Content: editedContent,
                UserID: user.user.userID,
                RoleID: user.user.RoleID
            });
            const updatedComments = comments.map((comment) =>
                comment.CommentID === commentId ? { ...comment, Content: editedContent } : comment
            );
            setComments(updatedComments);
            setEditingCommentId(null);
            setEditedContent('');
        } catch (err) {
            console.error("Ошибка при редактировании комментария:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId, {
                UserID: user.user.userID,
                RoleID: user.user.RoleID
            });
            const updatedComments = comments.filter((comment) => comment.CommentID !== commentId);
            setComments(updatedComments);
        } catch (err) {
            console.error("Ошибка при удалении комментария:", err);
        }
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return 'Дата не указана';
        const date = new Date(dateString);
        return isNaN(date) ? 'Некорректная дата' : date.toLocaleString();
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!discussion) {
        return <div className="not-found">Обсуждение не найдено</div>;
    }

    return (
        <div className="discussion-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Назад
            </button>

            <h1 className="discussion-title">{discussion.Title}</h1>
            <p className="discussion-content">{discussion.Content}</p>
            <div className="discussion-meta">
                <span>Автор: {discussion.CreatedBy || 'Не указан'}</span>
                <span>Дата: {formatDate(discussion.CreatedDate)}</span>
            </div>

            {/* Секция комментариев */}
            <div className="comments-section">
                <h2 className="comments-title">Комментарии</h2>

                {/* Список комментариев */}
                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.CommentID} className="comment-item">
                                {editingCommentId === comment.CommentID ? (
                                    <>
                                        <textarea
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                        />
                                        <button onClick={() => handleEditComment(comment.CommentID)}>
                                            Сохранить
                                        </button>
                                        <button onClick={() => setEditingCommentId(null)}>
                                            Отмена
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="comment-content">{comment.Content}</p>
                                        <div className="comment-meta">
                                            <span>Автор: {comment.Username}</span>
                                            <span>Дата: {formatDate(comment.CreatedDate)}</span>
                                        </div>
                                        {user.user && (user.user.UserID === comment.UserID || user.user.RoleID === 3) && (
                                            <div className="comment-actions">
                                                <button onClick={() => {
                                                    setEditingCommentId(comment.CommentID);
                                                    setEditedContent(comment.Content);
                                                }}>
                                                    Редактировать
                                                </button>
                                                <button onClick={() => handleDeleteComment(comment.CommentID)}>
                                                    Удалить
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-comments">Комментариев пока нет.</p>
                    )}
                </div>

                {/* Форма добавления комментария */}
                <div className="add-comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Оставьте ваш комментарий..."
                    />
                    <button onClick={handleAddComment}>Добавить комментарий</button>
                </div>
            </div>
        </div>
    );
};

export default DiscussionsOne;