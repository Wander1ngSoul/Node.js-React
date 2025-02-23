import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../Services/courseService';
import { Context } from '../index';
import '../Styles/Pages/CreateCourse.css'; // Импортируем файл стилей

const CreateCourse = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState({ CourseName: '', Description: '', Price: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(Context);

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
            const createdCourse = await createCourse(course);
            console.log('Созданный курс:', createdCourse); // Логирование
            alert('Курс успешно создан!');
            navigate(`/course/${createdCourse.CourseID}`);
        } catch (error) {
            console.error('Ошибка при создании курса:', error);
            setError('Не удалось создать курс. Пожалуйста, попробуйте снова.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-course-container">
            <h1 className="create-course-title">Создание нового курса</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="create-course-form">
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
                    {loading ? 'Создание...' : 'Создать курс'}
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;