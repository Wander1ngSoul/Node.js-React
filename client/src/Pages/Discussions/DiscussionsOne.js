import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDiscussionByID } from '../../Services/discussionsService';
import { fetchComments, createComment, updateComment, deleteComment } from '../../Services/commentService';
import { Context } from '../../index';
import '../../Styles/Pages/Discussions/DiscussionOne.css';

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

    console.log(user?.user?.roleID);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [foundDiscussion, commentsData] = await Promise.all([
                    fetchDiscussionByID(discussionId),
                    fetchComments(discussionId)
                ]);

                setDiscussion(foundDiscussion || null);
                setComments(commentsData || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [discussionId]);

    const handleAddComment = async () => {

        if (!newComment.trim()) {
            alert("Комментарий не может быть пустым");
            return;
        }

        try {
            const commentData = {
                DiscussionID: Number(discussionId),
                UserID: user.user.userID,
                Content: newComment,
                Username: user.user.username,
            };



            const addedComment = await createComment(commentData);
            setComments([addedComment, ...comments]);
            setNewComment('');
        } catch (err) {
            console.error("Ошибка при добавлении комментария:", err);
            alert(err.response?.data?.message || "Не удалось добавить комментарий");
        }
    };

    const handleEditComment = async (commentId) => {
        try {
            const commentToEdit = comments.find(c => c.CommentID === commentId);
            if (!commentToEdit) return;

            if (commentToEdit.UserID !== user.user.userID) {
                alert("Вы можете редактировать только свои комментарии");
                return;
            }

            const updateData = {
                Content: editedContent,
                UserID: user.user.userID,
                RoleID: user.user.RoleID
            };

            await updateComment(commentId, updateData);

            setComments(comments.map(comment =>
                comment.CommentID === commentId
                    ? { ...comment, Content: editedContent }
                    : comment
            ));
            setEditingCommentId(null);
            setEditedContent('');
        } catch (err) {
            console.error("Ошибка при редактировании:", err);
            alert(err.response?.data?.message || "Не удалось обновить комментарий");
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm("Вы уверены, что хотите удалить этот комментарий?")) {
            return;
        }

        try {
            const deleteData = {
                UserID: user.user.userID,
                RoleID: user.user.roleID
            };

            await deleteComment(commentId, deleteData);
            setComments(comments.filter(comment => comment.CommentID !== commentId));
        } catch (err) {
            console.error("Ошибка при удалении:", err);

            const errorMessage = err.response?.status === 403
                ? "У вас нет прав для удаления этого комментария"
                : err.response?.data?.message || "Произошла ошибка при удалении";

            alert(errorMessage);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Дата не указана';
        const date = new Date(dateString);
        return isNaN(date) ? 'Некорректная дата' : date.toLocaleString();
    };

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!discussion) return <div className="not-found">Обсуждение не найдено</div>;

    return (
        <div className="discussion-detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Назад</button>

            <h1 className="discussion-title">{discussion.Title}</h1>
            <p className="discussion-content">{discussion.Content}</p>
            <div className="discussion-meta">
                <span>Автор: {discussion.CreatedBy || 'Не указан'}</span>
                <span>Дата: {formatDate(discussion.CreatedDate)}</span>
            </div>

            <div className="comments-section">
                <h2 className="comments-title">Комментарии</h2>

                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.CommentID} className="comment-item">
                                {editingCommentId === comment.CommentID ? (
                                    <div className="comment-edit-mode">
                                        <textarea
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            className="comment-edit-textarea"
                                        />
                                        <div className="comment-edit-actions">
                                            <button
                                                onClick={() => handleEditComment(comment.CommentID)}
                                                className="save-button"
                                            >
                                                Сохранить
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingCommentId(null);
                                                    setEditedContent('');
                                                }}
                                                className="cancel-button"
                                            >
                                                Отмена
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="comment-content">{comment.Content}</p>
                                        <div className="comment-meta">
                                            <span>Автор: {comment.Username}</span>
                                            <span>Дата: {formatDate(comment.CreatedDate)}</span>
                                        </div>
                                        {user.user && (user.user.userID === comment.UserID || user.user.roleID === 3) && (
                                            <div className="comment-actions">
                                                {user.user.userID === comment.UserID && (
                                                    <button
                                                        onClick={() => {
                                                            setEditingCommentId(comment.CommentID);
                                                            setEditedContent(comment.Content);
                                                        }}
                                                        className="edit-button"
                                                    >
                                                        Редактировать
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteComment(comment.CommentID)}
                                                    className="delete-button"
                                                >
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

                {user.user && (
                    <div className="add-comment-form">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Оставьте ваш комментарий..."
                            className="comment-input"
                        />
                        <button
                            onClick={handleAddComment}
                            className="add-comment-button"
                            disabled={!newComment.trim()}
                        >
                            Добавить комментарий
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscussionsOne;