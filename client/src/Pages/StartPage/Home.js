import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../index';
import '../../Styles/Pages/StartPage/Home.css';

import stressImage from '../../Images/Photo1.avif';
import emotionalIntelligenceImage from '../../Images/Photo2.avif';
import sleepImage from '../../Images/Photo3.avif';
import aboutUsImage from '../../Images/Fon-TopBar.avif';
import aboutUsBottom from '../../Images/AboutAtUs.avif';
import quoteImage from '../../Images/Photo4.avif';
import user1 from '../../Images/user1.jpeg';
import user2 from '../../Images/user1.jpeg';
import user3 from '../../Images/user1.jpeg';

const Home = () => {
    const { user } = useContext(Context);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const popularTopics = [
        {
            id: 1,
            title: "Депрессия",
            shortInfo: "Как распознать и справиться с депрессией.",
            fullInfo: "Депрессия — это серьезное психическое расстройство, которое требует внимания и лечения. Основные симптомы включают постоянную грусть, потерю интереса к деятельности, изменения аппетита и сна. В статье рассматриваются современные методы терапии и самопомощи."
        },
        {
            id: 2,
            title: "Тревожность",
            shortInfo: "Методы борьбы с тревожными состояниями.",
            fullInfo: "Тревожные расстройства — одна из самых распространенных проблем психического здоровья. Мы расскажем о когнитивно-поведенческой терапии, техниках релаксации и других эффективных способах снижения тревожности в повседневной жизни."
        },
        {
            id: 3,
            title: "Самооценка",
            shortInfo: "Как повысить самооценку и уверенность в себе.",
            fullInfo: "Здоровая самооценка — основа психологического благополучия. В материале представлены упражнения для развития самопринятия, советы по преодолению самокритики и стратегии формирования устойчивой положительной самооценки."
        }
    ];

    const openModal = (topic) => {
        setSelectedTopic(topic);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="home">
            <header
                className="header"
                style={{ backgroundImage: `url(${aboutUsImage})` }}
            >
                <div className="header-overlay">
                    <h1>Журнал Психологии</h1>
                    <p>Исследования, практика и вдохновение для вашего ума</p>
                </div>
            </header>

            <nav className="navigation">
                <Link to="/courses" className="nav-link">Курсы</Link>
                <Link to="/news" className="nav-link">Новости</Link>
                <Link to="/discussions" className="nav-link">Обсуждения</Link>
                {user.isAuth && (
                    <>
                        <Link to={`/cart/${user.user.userID}`} className="nav-link">Корзина</Link>
                        {user.user.roleID === 3 && (
                            <Link to="/statistics" className="nav-link">Статистика</Link>
                        )}
                    </>
                )}
            </nav>

            <section className="featured-articles">
                <h2>Избранные статьи</h2>
                <div className="article-carousel">
                    <div className="article-card">
                        <img src={stressImage} alt="Стресс" className="article-image" />
                        <h3>Как справляться со стрессом в современном мире</h3>
                        <p>Практические советы и техники для снижения уровня стресса.</p>
                        <Link to="/article/stress-management" className="read-more">Читать далее</Link>
                    </div>
                    <div className="article-card">
                        <img src={emotionalIntelligenceImage} alt="Эмоциональный интеллект" className="article-image" />
                        <h3>Эмоциональный интеллект: ключ к успеху</h3>
                        <p>Как развивать эмоциональный интеллект и использовать его в повседневной жизни.</p>
                        <Link to="/article/emotional-intelligence" className="read-more">Читать далее</Link>
                    </div>
                    <div className="article-card">
                        <img src={sleepImage} alt="Сон" className="article-image" />
                        <h3>Сон и психическое здоровье</h3>
                        <p>Влияние качества сна на ваше психическое состояние.</p>
                        <Link to="/article/sleep-and-mental-health" className="read-more">Читать далее</Link>
                    </div>
                </div>
            </section>

            <section className="popular-topics">
                <h2>Популярные темы</h2>
                <div className="topics-list">
                    {popularTopics.map(topic => (
                        <div
                            key={topic.id}
                            className="topic-card"
                            onClick={() => openModal(topic)}
                        >
                            <h3>{topic.title}</h3>
                            <p>{topic.shortInfo}</p>
                            <button className="read-more-btn">Узнать больше</button>
                        </div>
                    ))}
                </div>
            </section>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal}>×</button>
                        <h2>{selectedTopic.title}</h2>
                        <p>{selectedTopic.fullInfo}</p>
                    </div>
                </div>
            )}

            <section
                className="quotes-section"
                style={{ backgroundImage: `url(${quoteImage})` }}
            >
                <div className="quotes-overlay">
                    <h2>Цитаты для вдохновения</h2>
                    <blockquote>
                        "Познание себя — это начало всей мудрости."
                        <cite>— Аристотель</cite>
                    </blockquote>
                    <blockquote>
                        "Счастье — это не что-то готовое. Оно приходит из ваших собственных действий."
                        <cite>— Далай-лама</cite>
                    </blockquote>
                </div>
            </section>

            <section className="about-us">
                <div className="about-us-content">
                    <div className="about-us-text">
                        <h2>О нас</h2>
                        <p>
                            Журнал Психологии — это платформа для всех, кто интересуется психологией, саморазвитием и психическим здоровьем.
                            Мы публикуем статьи, основанные на научных исследованиях, практические рекомендации и вдохновляющие истории.
                            Наша миссия — помочь вам лучше понять себя и окружающий мир, а также найти баланс в жизни.
                        </p>
                        <p>
                            Присоединяйтесь к нашему сообществу и начните свой путь к гармонии и счастью уже сегодня!
                        </p>
                    </div>
                    <img src={aboutUsBottom} alt="О нас" className="about-us-image" />
                </div>
            </section>

            <section className="testimonials">
                <h2>Отзывы наших пользователей</h2>
                <div className="testimonials-list">
                    <div className="testimonial-card">
                        <img src={user1} alt="User 1" className="testimonial-image" />
                        <h3>Анна</h3>
                        <p>"Журнал помог мне справиться с тревожностью. Очень полезные статьи!"</p>
                    </div>
                    <div className="testimonial-card">
                        <img src={user2} alt="User 2" className="testimonial-image" />
                        <h3>Иван</h3>
                        <p>"Отличные курсы по саморазвитию. Рекомендую всем!"</p>
                    </div>
                    <div className="testimonial-card">
                        <img src={user3} alt="User 3" className="testimonial-image" />
                        <h3>Мария</h3>
                        <p>"Спасибо за вдохновляющие истории. Они помогли мне поверить в себя."</p>
                    </div>
                </div>
            </section>

            <section className="newsletter">
                <h2>Подпишитесь на нашу рассылку</h2>
                <p>Получайте свежие статьи, советы и новости прямо на вашу почту.</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Введите ваш email" required />
                    <button type="submit">Подписаться</button>
                </form>
            </section>

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

export default Home;