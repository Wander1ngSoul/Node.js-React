import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Pages/Selected_articles/EmotionalIntelligence.css';

const EmotionalIntelligence = () => {
    const [showTips, setShowTips] = useState(false);
    const [selfAwareness, setSelfAwareness] = useState(null);

    const handleTest = (level) => {
        setSelfAwareness(level);
    };

    return (
        <div className="ei-page">
            <header className="ei-header">
                <h1>Развитие эмоционального интеллекта</h1>
                <p>Узнайте, как управлять своими эмоциями и лучше понимать других</p>
            </header>

            <section className="ei-test">
                <h2>Пройдите мини-тест</h2>
                <p>Насколько вы осознаёте свои эмоции?</p>
                <div className="test-options">
                    <button onClick={() => handleTest('высокий')}>Я легко распознаю свои эмоции</button>
                    <button onClick={() => handleTest('средний')}>Иногда понимаю, что чувствую</button>
                    <button onClick={() => handleTest('низкий')}>Мне сложно определить свои чувства</button>
                </div>
                {selfAwareness && (
                    <div className="test-result">
                        <p>Ваш уровень эмоциональной осознанности: <strong>{selfAwareness}</strong></p>
                        {selfAwareness === 'высокий' && <p>Отличная работа! Вы умеете понимать себя.</p>}
                        {selfAwareness === 'средний' && <p>Попробуйте вести дневник эмоций или практиковать рефлексию.</p>}
                        {selfAwareness === 'низкий' && <p>Начните с простых практик наблюдения за собой и медитации.</p>}
                    </div>
                )}
            </section>

            <section className="ei-tips">
                <h2>Полезные техники</h2>
                <button className="toggle-btn" onClick={() => setShowTips(!showTips)}>
                    {showTips ? 'Скрыть техники' : 'Показать техники'}
                </button>
                {showTips && (
                    <ul className="tips-list">
                        <li>Ведение дневника эмоций</li>
                        <li>Практика эмпатии в общении</li>
                        <li>Умение делать паузу перед реакцией</li>
                        <li>Анализ своих эмоциональных триггеров</li>
                        <li>Построение доверительных отношений</li>
                        <li>Регулярное саморазвитие и рефлексия</li>
                    </ul>
                )}
            </section>

            <footer className="ei-footer">
                <Link to="/" className="back-link">← Назад на главную</Link>
            </footer>
        </div>
    );
};

export default EmotionalIntelligence;