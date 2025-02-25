<<<<<<< HEAD
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../index';
import '../Styles/Pages/Home.css';


=======
import React, { useContext } from 'react'; // Импортируем useContext
import { Link } from 'react-router-dom';
import { Context } from '../index'; // Импортируем контекст
import '../Styles/Pages/Home.css'; // Подключаем стили

// Импортируем изображения
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
import stressImage from '../Images/Photo1.avif';
import emotionalIntelligenceImage from '../Images/Photo2.avif';
import sleepImage from '../Images/Photo3.avif';
import aboutUsImage from '../Images/Fon-TopBar.avif';
import aboutUsBottom from '../Images/AboutAtUs.avif';
import quoteImage from '../Images/Photo4.avif';
import user1 from '../Images/user1.jpeg';
import user2 from '../Images/user1.jpeg';
import user3 from '../Images/user1.jpeg';

const Home = () => {

    const { user } = useContext(Context);

    return (
        <div className="home">
            <header
                className="header"
                style={{backgroundImage: `url(${aboutUsImage})`}}
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
                        {user.user.RoleID === 3 && <Link to="/statistics" className="nav-link">Статистика</Link>}
                    </>
                )}
            </nav>

            <section className="featured-articles">
                <h2>Избранные статьи</h2>
                <div className="article-carousel">
                    <div className="article-card">
                        <img src={stressImage} alt="Стресс" className="article-image"/>
                        <h3>Как справляться со стрессом в современном мире</h3>
                        <p>Практические советы и техники для снижения уровня стресса.</p>
                        <Link to="/article/stress-management" className="read-more">Читать далее</Link>
                    </div>
                    <div className="article-card">
                        <img src={emotionalIntelligenceImage} alt="Эмоциональный интеллект" className="article-image"/>
                        <h3>Эмоциональный интеллект: ключ к успеху</h3>
                        <p>Как развивать эмоциональный интеллект и использовать его в повседневной жизни.</p>
                        <Link to="/article/emotional-intelligence" className="read-more">Читать далее</Link>
                    </div>
                    <div className="article-card">
                        <img src={sleepImage} alt="Сон" className="article-image"/>
                        <h3>Сон и психическое здоровье</h3>
                        <p>Влияние качества сна на ваше психическое состояние.</p>
                        <Link to="/article/sleep-and-mental-health" className="read-more">Читать далее</Link>
                    </div>
                </div>
            </section>

            {/* Секция с популярными темами */}
            <section className="popular-topics">
                <h2>Популярные темы</h2>
                <div className="topics-list">
                    <div className="topic-card">
                        <h3>Депрессия</h3>
                        <p>Как распознать и справиться с депрессией.</p>
                    </div>
                    <div className="topic-card">
                        <h3>Тревожность</h3>
                        <p>Методы борьбы с тревожными состояниями.</p>
                    </div>
                    <div className="topic-card">
                        <h3>Самооценка</h3>
                        <p>Как повысить самооценку и уверенность в себе.</p>
                    </div>
                </div>
            </section>

            {/* Секция с цитатами */}
            <section
                className="quotes-section"
                style={{backgroundImage: `url(${quoteImage})`}}
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

            {/* Секция "О нас" с изображением */}
            <section className="about-us">
                <div className="about-us-content">
                    <div className="about-us-text">
                        <h2>О нас</h2>
                        <p>
                            Журнал Психологии — это платформа для всех, кто интересуется психологией, саморазвитием и
                            психическим здоровьем.
                            Мы публикуем статьи, основанные на научных исследованиях, практические рекомендации и
                            вдохновляющие истории.
                            Наша миссия — помочь вам лучше понять себя и окружающий мир, а также найти баланс в жизни.
                        </p>
                        <p>
                            Присоединяйтесь к нашему сообществу и начните свой путь к гармонии и счастью уже сегодня!
                        </p>
                    </div>
                    <img src={aboutUsBottom} alt="О нас" className="about-us-image"/>
                </div>
            </section>

            {/* Секция с отзывами пользователей */}
            <section className="testimonials">
                <h2>Отзывы наших пользователей</h2>
                <div className="testimonials-list">
                    <div className="testimonial-card">
                        <img src={user1} alt="User 1" className="testimonial-image"/>
                        <h3>Анна</h3>
                        <p>"Журнал помог мне справиться с тревожностью. Очень полезные статьи!"</p>
                    </div>
                    <div className="testimonial-card">
                        <img src={user2} alt="User 2" className="testimonial-image"/>
                        <h3>Иван</h3>
                        <p>"Отличные курсы по саморазвитию. Рекомендую всем!"</p>
                    </div>
                    <div className="testimonial-card">
                        <img src={user3} alt="User 3" className="testimonial-image"/>
                        <h3>Мария</h3>
                        <p>"Спасибо за вдохновляющие истории. Они помогли мне поверить в себя."</p>
                    </div>
                </div>
            </section>

            {/* Секция с подпиской на рассылку */}
            <section className="newsletter">
                <h2>Подпишитесь на нашу рассылку</h2>
                <p>Получайте свежие статьи, советы и новости прямо на вашу почту.</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Введите ваш email" required/>
                    <button type="submit">Подписаться</button>
                </form>
            </section>

<<<<<<< HEAD
=======
            {/* Футер */}
>>>>>>> 9a1df878aae47dbfe81de5370f5879a2f01f7910
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