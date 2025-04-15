import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Pages/Selected_articles/MentalHealth.css';

const MentalHealth = () => {
    const [showTips, setShowTips] = useState(false);
    const [sleepQuality, setSleepQuality] = useState(null);
    const [bedtime, setBedtime] = useState('');

    const handleTest = (quality) => {
        setSleepQuality(quality);
    };

    const handleBedtimeChange = (e) => {
        setBedtime(e.target.value);
    };

    return (
        <div className="mental-health-page">
            <header className="mental-health-header">
                <h1>Сон и психическое здоровье</h1>
                <p>Как качество сна влияет на ваше эмоциональное состояние</p>
            </header>

            <section className="sleep-test">
                <h2>Оцените свой сон</h2>
                <p>Как вы спали на прошлой неделе?</p>
                <div className="test-options">
                    <button onClick={() => handleTest('отличный')}>Отлично, высыпаюсь</button>
                    <button onClick={() => handleTest('средний')}>Нормально, но бывает усталость</button>
                    <button onClick={() => handleTest('плохой')}>Плохо, часто просыпаюсь</button>
                </div>

                {sleepQuality && (
                    <div className="test-result">
                        <p>Качество вашего сна: <strong>{sleepQuality}</strong></p>
                        {sleepQuality === 'плохой' && (
                            <p>Рекомендуем обратиться к специалисту и наладить режим.</p>
                        )}
                        {sleepQuality === 'средний' && (
                            <p>Попробуйте улучшить гигиену сна и ложиться раньше.</p>
                        )}
                        {sleepQuality === 'отличный' && (
                            <p>Вы отлично следите за своим сном! Так держать!</p>
                        )}
                    </div>
                )}

                <div className="bedtime-tracker">
                    <h3>Отслеживание времени отхода ко сну</h3>
                    <input
                        type="time"
                        value={bedtime}
                        onChange={handleBedtimeChange}
                        className="time-input"
                    />
                    {bedtime && <p>Вы планируете лечь спать в: <strong>{bedtime}</strong></p>}
                </div>
            </section>

            <section className="sleep-tips">
                <h2>Советы для улучшения сна</h2>
                <button
                    className="toggle-btn"
                    onClick={() => setShowTips(!showTips)}
                >
                    {showTips ? 'Скрыть советы' : 'Показать советы'}
                </button>
                {showTips && (
                    <ul className="tips-list">
                        <li>Соблюдайте регулярный график сна (ложитесь и вставайте в одно время)</li>
                        <li>Создайте ритуал перед сном (теплый душ, чтение, медитация)</li>
                        <li>Избегайте кофеина и тяжелой пищи за 3-4 часа до сна</li>
                        <li>Ограничьте использование гаджетов перед сном</li>
                        <li>Поддерживайте в спальне прохладную температуру (18-21°C)</li>
                        <li>Регулярная физическая активность улучшает качество сна</li>
                        <li>Рассмотрите возможность ведения дневника сна</li>
                    </ul>
                )}
            </section>

            <section className="sleep-facts">
                <h2>Интересные факты о сне</h2>
                <div className="facts-grid">
                    <div className="fact-card">
                        <h3>Фазы сна</h3>
                        <p>Полный цикл сна длится около 90 минут и включает 4 стадии NREM и REM-сон</p>
                    </div>
                    <div className="fact-card">
                        <h3>Сон и память</h3>
                        <p>Во время сна происходит консолидация памяти - перенос информации в долговременную память</p>
                    </div>
                    <div className="fact-card">
                        <h3>Недостаток сна</h3>
                        <p>Хронический недосып увеличивает риск депрессии на 40%</p>
                    </div>
                </div>
            </section>

            <footer className="mental-health-footer">
                <Link to="/" className="back-link">← Назад на главную</Link>
            </footer>
        </div>
    );
};

export default MentalHealth;