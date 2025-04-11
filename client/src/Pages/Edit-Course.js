import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseByID, updateCourse, createCourse } from '../Services/courseService';
import { Context } from '../index';
import '../Styles/Pages/Edit-Course.css';

const EditCourse = () => {
    const { CourseID } = useParams(); // Получаем CourseID из параметров маршрута
    const navigate = useNavigate();
    const [course, setCourse] = useState({ CourseName: '', Description: '', Price: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(Context);

    const isNewCourse = CourseID === 'new';

    useEffect(() => {
        if (!isNewCourse) {
            const loadCourse = async () => {
                setLoading(true);
                try {
                    const data = await fetchCourseByID(CourseID);
                    setCourse(data);
                } catch (error) {
                    console.error('Ошибка при загрузке курса:', error);
                    setError('Не удалось загрузить данные курса.');
                } finally {
                    setLoading(false);
                }
            };
            loadCourse();
        }
    }, [CourseID, isNewCourse]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!course.CourseName || !course.Description || course.Price <= 0) {
            setError('Все поля должны быть заполнены, а цена должна быть больше 0.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let response;
            if (isNewCourse) {
                response = await createCourse(course);
                alert('Курс успешно создан!');
            } else {
                response = await updateCourse(CourseID, course);
                alert('Курс успешно обновлен!');
            }
            console.log('Ответ сервера:', response);
            navigate(`/course/${response.CourseID}`);
        } catch (error) {
            console.error('Ошибка:', error);
            setError(isNewCourse ? 'Не удалось создать курс. Пожалуйста, попробуйте снова.' : 'Не удалось обновить курс. Пожалуйста, попробуйте снова.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-course-container">
            <h1 className="edit-course-title">
                {isNewCourse ? 'Создание нового курса' : 'Редактирование курса'}
            </h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="edit-course-form">
                <div className="form-group">
                    <label className="form-label">Название курса:</label>
                    <input
                        type="text"
                        name="CourseName"
                        value={course.CourseName}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Описание:</label>
                    <textarea
                        name="Description"
                        value={course.Description}
                        onChange={handleChange}
                        className="form-textarea"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Цена:</label>
                    <input
                        type="number"
                        name="Price"
                        value={course.Price}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        required
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? (isNewCourse ? 'Создание...' : 'Сохранение...') : (isNewCourse ? 'Создать курс' : 'Сохранить изменения')}
                </button>
            </form>
        </div>
    );
};

export default EditCourse;