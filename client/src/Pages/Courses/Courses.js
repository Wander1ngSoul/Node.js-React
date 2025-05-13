import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from "../../Components/CourseCard";
import '../../Courses/Style/CourseStore.css';
import { fetchCourses, deleteCourse as deleteCourseApi } from '../../Services/courseService';
import '../../Styles/Pages/Courses/Courses.css';
import { Context } from '../../index';

const Courses = () => {
    const [coursesList, setCoursesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [onlyWithDescription, setOnlyWithDescription] = useState(false);

    const navigate = useNavigate();
    const { user } = useContext(Context);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await fetchCourses();
                setCoursesList(data);
            } catch (error) {
                console.error('Ошибка при загрузке курсов:', error);
            }
        };
        loadCourses();
    }, []);

    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourseApi(courseId);
            setCoursesList(prevCourses =>
                prevCourses.filter(course => course.CourseID !== courseId)
            );
        } catch (error) {
            console.error('Ошибка при удалении курса:', error);
        }
    };

    const filteredCourses = coursesList.filter(course => {
        const matchesName = course.CourseName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMinPrice = minPrice === '' || Number(course.Price) >= Number(minPrice);
        const matchesMaxPrice = maxPrice === '' || Number(course.Price) <= Number(maxPrice);
        const matchesDescription = !onlyWithDescription || !!course.Description;
        return matchesName && matchesMinPrice && matchesMaxPrice && matchesDescription;
    });

    return (
        <div className="page-container">
            <Container className="mt-2 content-wrap">
                <Row className="align-items-center mb-4">
                    <Col xs="auto">
                        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                            Назад
                        </Button>
                    </Col>
                    <Col className="flex-grow-1">
                        <Form className="search-form">
                            <Form.Group className="mb-2">
                                <Form.Control
                                    type="text"
                                    placeholder="Поиск по названию"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form.Group>

                            <Row className="price-fields">
                                <Col xs={6} md={4} lg={3}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Мин. цена"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        size="sm"
                                        className="small-price-input"
                                    />
                                </Col>
                                <Col xs={6} md={4} lg={3}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Макс. цена"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        size="sm"
                                        className="small-price-input"
                                    />
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                    <Col xs="auto">

                        {user?.isAuth && user.user?.roleID === 3 && (
                            <Button variant="success" onClick={() => navigate('/create-course')}>
                                Создать курс
                            </Button>
                        )}
                    </Col>
                </Row>

                <Row>
                    {filteredCourses.map(course => (
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

export default Courses;