<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from "../Components/CourseCard";
import '../Courses/Style/CourseStore.css';
import { fetchCourses, deleteCourse as deleteCourseApi } from '../Services/courseService';
import '../Styles/Pages/Courses.css';
<<<<<<< HEAD
import { Context } from '../index';
=======
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910

const Courses = () => {
    const [coursesList, setCoursesList] = useState([]);
    const navigate = useNavigate();
<<<<<<< HEAD
    const { user } = useContext(Context);

    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourseApi(courseId);
            setCoursesList(prevCourses => prevCourses.filter(course => course.CourseID !== courseId));
=======

    // Функция для удаления курса
    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourseApi(courseId);
            // Обновляем список курсов после удаления
            const updatedCourses = coursesList.filter(course => course.CourseID !== courseId);
            setCoursesList(updatedCourses);
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
        } catch (error) {
            console.error('Ошибка при удалении курса:', error);
        }
    };

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCoursesList(data);
            } catch (error) {
                console.error('Ошибка при загрузке курсов:', error);
            }
        };
<<<<<<< HEAD
=======

>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
        loadCourses();
    }, []);

    return (
        <div className="page-container">
            <Container className="mt-2 content-wrap">
                <Row className="align-items-center mb-4">
                    <Col xs="auto">
                        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                            Назад
                        </Button>
                    </Col>
<<<<<<< HEAD
                    <Col className="flex-grow-1">
=======
                    <Col className="flex-grow-1"> {/* Гибкий контейнер для поисковой строки */}
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                        <Form className="search-form">
                            <Form.Group className="form-group">
                                <Form.Control
                                    type="text"
                                    id="searchInput"
                                    placeholder="Поиск"
<<<<<<< HEAD
                                    className="w-100"
=======
                                    className="w-100" // Занимает всю доступную ширину
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                                />
                                <i className="fas fa-search search-icon"></i>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs="auto">
<<<<<<< HEAD
                        {user?.isAuth && user.user?.RoleID === 2 && (
                            <Button variant="success" onClick={() => navigate('/create-course')}>
                                Создать курс
                            </Button>
                        )}
=======
                        <Button variant="success" onClick={() => navigate('/create-course')}>
                            Создать курс
                        </Button>
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
                    </Col>
                </Row>

                <Row>
                    {coursesList.map(course => (
                        <Col md={3} key={course.CourseID}>
                            <CourseCard course={course} onDelete={handleDeleteCourse} />
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
    );
};

<<<<<<< HEAD
export default Courses;
=======
export default Courses;
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
